const initialCode = [
    '#include <iostream>',
    'using namespace std;',
    '',
    'struct Node {',
    '    int data;',
    '    Node* next;',
    '};',
    '',
    'int main() {',
    '    Node* head = nullptr;',
    '    Node* first = new Node(10);',
    '    head = first;',
    '    Node* second = new Node(20);',
    '    second->next = head;',
    '    head = second;',
    '',
    '    return 0;',
    '}'
];

const mockExecutionStates = [
    {
        step: 0,
        line: 10,
        code: 'Node* head = nullptr;',
        variables: { head: null },
        stack: { head: null },
        heap: {},
        pointers: { head: null },
        output: '',
        error: null
    },
    {
        step: 1,
        line: 11,
        code: 'Node* first = new Node(10);',
        variables: {
            head: null,
            first: 'node_01'
        },
        stack: {
            head: null,
            first: 'node_01'
        },
        heap: {
            node_01: {
                data: 10,
                next: null
            }
        },
        pointers: {
            head: null,
            first: 'node_01'
        },
        output: '',
        error: null
    },
    {
        step: 2,
        line: 12,
        code: 'head = first;',
        variables: {
            head: 'node_01',
            first: 'node_01'
        },
        stack: {
            head: 'node_01',
            first: 'node_01'
        },
        heap: {
            node_01: {
                data: 10,
                next: null
            }
        },
        pointers: {
            head: 'node_01',
            first: 'node_01'
        },
        output: '',
        error: null
    },
    {
        step: 3,
        line: 13,
        code: 'Node* second = new Node(20);',
        variables: {
            head: 'node_01',
            first: 'node_01',
            second: 'node_02'
        },
        stack: {
            head: 'node_01',
            first: 'node_01',
            second: 'node_02'
        },
        heap: {
            node_01: {
                data: 10,
                next: null
            },
            node_02: {
                data: 20,
                next: null
            }
        },
        pointers: {
            head: 'node_01',
            first: 'node_01',
            second: 'node_02'
        },
        output: '',
        error: null
    },
    {
        step: 4,
        line: 14,
        code: 'second->next = head;',
        variables: {
            head: 'node_01',
            first: 'node_01',
            second: 'node_02'
        },
        stack: {
            head: 'node_01',
            first: 'node_01',
            second: 'node_02'
        },
        heap: {
            node_01: {
                data: 10,
                next: null
            },
            node_02: {
                data: 20,
                next: 'node_01'
            }
        },
        pointers: {
            head: 'node_01',
            first: 'node_01',
            second: 'node_02',
            'node_02.next': 'node_01'
        },
        output: '',
        error: null
    },
    {
        step: 5,
        line: 15,
        code: 'head = second;',
        variables: {
            head: 'node_02',
            first: 'node_01',
            second: 'node_02'
        },
        stack: {
            head: 'node_02',
            first: 'node_01',
            second: 'node_02'
        },
        heap: {
            node_01: {
                data: 10,
                next: null
            },
            node_02: {
                data: 20,
                next: 'node_01'
            }
        },
        pointers: {
            head: 'node_02',
            first: 'node_01',
            second: 'node_02',
            'node_02.next': 'node_01'
        },
        output: '',
        error: null
    }
];

let executionStates = [...mockExecutionStates];
let currentStep = 0;
let programOutput = '';
let codeLines = [...initialCode];
let vivaAnswered = false;

const $ = id => document.getElementById(id);


function renderEditor() {

    const editor = $('codeEditor');

    editor.innerHTML = '';

    codeLines.forEach((line, index) => {

        const row = document.createElement('div');

        row.className = 'code-row';

        if (
            executionStates[currentStep] &&
            index + 1 === executionStates[currentStep].line
        ) {
            row.classList.add('execution-highlight');
        }

        const number = document.createElement('span');

        number.className = 'code-number';

        number.textContent = index + 1;

        const input = document.createElement('input');

        input.value = line;

        input.spellcheck = false;

        input.addEventListener('input', event => {

            codeLines[index] = event.target.value;

        });

        row.appendChild(number);

        row.appendChild(input);

        editor.appendChild(row);

    });
}


function formatValue(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return 'nullptr';
    }

    if (
        typeof value === 'object'
    ) {
        return JSON.stringify(
            value,
            null,
            2
        );
    }

    return String(value);
}


function formatObject(object) {

    if (
        !object ||
        Object.keys(object).length === 0
    ) {
        return '{}';
    }

    return Object.entries(object)
        .map(
            ([key, value]) =>
                `${key}: ${formatValue(value)}`
        )
        .join('\n');
}


function getNodes(state) {

    const nodes = [];

    const visited = new Set();

    let nodeId =
        state.pointers?.head ?? null;

    while (
        nodeId &&
        !visited.has(nodeId)
    ) {

        visited.add(nodeId);

        const node =
            state.heap[nodeId];

        if (!node) {
            break;
        }

        nodes.push({
            id: nodeId,
            data: node.data,
            next: node.next ?? null
        });

        nodeId =
            node.next ?? null;
    }

    return nodes;
}


function renderVisualization() {

    const state =
        executionStates[currentStep];

    const previous =
        executionStates[currentStep - 1];
        if (!state) {
    $('headValue').textContent = '→ nullptr';
    $('lineBadge').textContent = 'No execution state';

    $('nodesContainer').innerHTML = `
        <div class="empty-heap">
            <strong>No visualization available</strong>
            <span>
                Execute supported linked-list code to visualize memory.
            </span>
        </div>
    `;

    $('changeContent').textContent =
        'No execution state available.';

    return;
}

    $('headValue').textContent =
        state.pointers?.head
            ? `→ ${state.pointers.head}`
            : '→ nullptr';

    $('lineBadge').textContent =
        `Line ${state.line}`;

    const nodesContainer =
        $('nodesContainer');

    nodesContainer.innerHTML = '';

    const nodes =
        getNodes(state);

    if (nodes.length === 0) {

        nodesContainer.innerHTML = `
            <div class="empty-heap">
                <strong>Heap is empty</strong>
                <span>
                    Execute the program to create a node.
                </span>
            </div>
        `;

    } else {

        nodes.forEach(node => {

            const isHead =
                state.pointers?.head === node.id;

            const previousNode =
                previous?.heap?.[node.id];

            const isNew =
                !previousNode;

            const changed =
                JSON.stringify(previousNode) !==
                JSON.stringify(state.heap[node.id]);

            const wrapper =
                document.createElement('div');

            wrapper.className =
                'node-wrapper';

            const nodeElement =
                document.createElement('div');

            nodeElement.className =
                'visual-node' +
                (isHead ? ' is-head' : '') +
                (isNew ? ' is-new' : '');

            nodeElement.innerHTML = `
                <div class="node-header">
                    <span>${node.id}</span>

                    ${
                        isHead
                            ? '<b>HEAD ↓</b>'
                            : ''
                    }
                </div>

                <div class="node-values">

                    <div>
                        <small>DATA</small>

                        <strong>
                            ${node.data}
                        </strong>
                    </div>

                    <div
                        class="${
                            changed
                                ? 'changed-value'
                                : ''
                        }"
                    >
                        <small>NEXT</small>

                        <strong>
                            ${
                                node.next ??
                                'nullptr'
                            }
                        </strong>
                    </div>

                </div>
            `;

            wrapper.appendChild(nodeElement);

            if (node.next !== null) {

                const arrow =
                    document.createElement('div');

                arrow.className =
                    'node-arrow';

                arrow.textContent =
                    '→';

                wrapper.appendChild(arrow);
            }

            nodesContainer.appendChild(wrapper);

        });
    }

    renderChanges(
        state,
        previous
    );
}


function renderChanges(
    state,
    previous
) {

    const container =
        $('changeContent');

    if (currentStep === 0) {

        container.textContent =
            'Program execution started. No previous state to compare.';

        return;
    }

    const changes = [];

    const currentPointers =
        state.pointers || {};

    const previousPointers =
        previous?.pointers || {};

    Object.keys(currentPointers)
        .forEach(pointer => {

            if (
                currentPointers[pointer] !==
                previousPointers[pointer]
            ) {

                const from =
                    previousPointers[pointer] ??
                    'nullptr';

                const to =
                    currentPointers[pointer] ??
                    'nullptr';

                changes.push(
                    `${pointer}: ${from} → ${to}`
                );
            }

        });

    Object.keys(
        state.heap || {}
    ).forEach(nodeId => {

        const before =
            previous?.heap?.[nodeId];

        const after =
            state.heap[nodeId];

        if (
            JSON.stringify(before) !==
            JSON.stringify(after)
        ) {

            changes.push(
                `Heap: ${nodeId} changed`
            );
        }

    });

    if (changes.length === 0) {

        container.textContent =
            'No memory or pointer changes in this step.';

    } else {

        container.innerHTML =
            changes
                .map(
                    change =>
                        `<div>${change}</div>`
                )
                .join('');
    }
}


function renderVariables() {

    const state =
        executionStates[currentStep];

    if (!state) {
        $('variablesPanel').textContent = '{}';
        $('stackPanel').textContent = '{}';
        $('heapPanel').textContent = '{}';
        $('pointersPanel').textContent = '{}';
        return;
    }

    $('variablesPanel').textContent =
        formatObject(state.variables);

    $('stackPanel').textContent =
        formatObject(state.stack);

    $('heapPanel').textContent =
        formatObject(state.heap);

    $('pointersPanel').textContent =
        formatObject(state.pointers);
}

function renderConsole() {

    const state =
        executionStates[currentStep];

    if (!state) {

        $('outputPanel').textContent =
            programOutput ||
            'No execution state available.';

        $('errorPanel')
            .classList
            .add('hidden');

        return;
    }

    $('outputPanel').textContent =
        state.output ||
        programOutput ||
        'No output at this step.';

    if (state.error) {

        $('errorPanel').textContent =
            state.error;

        $('errorPanel')
            .classList
            .remove('hidden');

    } else {

        $('errorPanel')
            .classList
            .add('hidden');
    }
}
function renderTimeline() {

    const timeline =
        $('timeline');

    timeline.innerHTML = '';

    if (executionStates.length === 0) {
        timeline.innerHTML = `
            <div class="timeline-empty">
                No execution steps available.
            </div>
        `;
        return;
    }

    executionStates.forEach((state, index) => {

        const button =
            document.createElement('button');

        button.className =
            'timeline-item';

        if (index === currentStep) {
            button.classList.add('current');
        }

        if (index < currentStep) {
            button.classList.add('completed');
        }

        button.innerHTML = `
            <span class="timeline-number">
                ${
                    index < currentStep
                        ? '✓'
                        : index + 1
                }
            </span>

            <span>
                <b>
                    Step ${index + 1}
                </b>

                <small>
                    ${state.code}
                </small>
            </span>
        `;

        button.addEventListener(
            'click',
            () => {
                currentStep = index;
                render();
            }
        );

        timeline.appendChild(button);
    });
}

function render() {

    const state =
        executionStates[currentStep];

    $('stepCounter').textContent =
        `${currentStep + 1} / ${executionStates.length}`;

    $('timelineCounter').textContent =
        `Step ${currentStep + 1} / ${executionStates.length}`;

    $('progressBar').style.width =
        `${
            (
                (currentStep + 1) /
                executionStates.length
            ) * 100
        }%`;

    $('previousBtn').disabled =
        currentStep === 0;

    $('nextBtn').disabled =
        currentStep ===
        executionStates.length - 1;

    renderEditor();

    renderConsole();

    renderVariables();

    renderVisualization();

    renderTimeline();
}


function resetLab() {

    executionStates =
        [...mockExecutionStates];

    currentStep = 0;

    codeLines =
        [...initialCode];

    vivaAnswered = false;

    document
        .querySelectorAll('.answer-btn')
        .forEach(button => {

            button.classList.remove(
                'correct',
                'incorrect'
            );

        });

    $('vivaResult').textContent = '';

    $('vivaScore').textContent =
        'Score: 0/1';

    hideNotice();

    render();
}


async function runCode() {

    const code =
        codeLines.join('\n');

    showNotice(
        'Running C++ code...'
    );

    $('runBtn').disabled = true;

    $('runBtn').textContent =
        'Running...';

    try {

        const response =
            await fetch('/api/execute-cpp', 
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({
                        code
                    })
                }
            );

        const contentType =
            response.headers.get(
                'content-type'
            ) || '';

        if (
            !contentType.includes(
                'application/json'
            )
        ) {

            throw new Error(
                'Execution API is not connected. Using demo execution.'
            );
        }

        const result =
            await response.json();
       
        programOutput =
            result.output || '';
       if (!result.traceSupported) {
    executionStates = [];
    currentStep = 0;

    showNotice(
        'C++ code executed successfully, but visualization is not supported for this code yet.'
    );

    render();
    return;
}

       if (
    !response.ok ||
    !result.success
) {

            throw new Error(
                result.error ||
                result.message ||
                'Execution failed.'
            );
        }

        executionStates =
            result.executionStates;

        currentStep = 0;

        showNotice(
            'C++ code executed successfully.'
        );

        render();

    } catch (error) {

        console.log(
            'Execution API unavailable:',
            error
        );

        executionStates = [];
currentStep = 0;

showNotice(
    'Execution API unavailable. Please try again.'
);

        render();

    } finally {

        $('runBtn').disabled = false;

        $('runBtn').textContent =
            '▶ Run Code';
    }
}


function showNotice(message) {

    $('notice').textContent =
        message;

    $('notice')
        .classList
        .remove('hidden');
}


function hideNotice() {

    $('notice')
        .classList
        .add('hidden');
}


$('nextBtn')
    .addEventListener(
        'click',
        () => {

            if (
                currentStep <
                executionStates.length - 1
            ) {

                currentStep++;

                render();
            }

        }
    );


$('previousBtn')
    .addEventListener(
        'click',
        () => {

            if (
                currentStep > 0
            ) {

                currentStep--;

                render();
            }

        }
    );


$('resetBtn')
    .addEventListener(
        'click',
        resetLab
    );


$('runBtn')
    .addEventListener(
        'click',
        runCode
    );


$('consoleTab')
    .addEventListener(
        'click',
        () => {

            $('consoleTab')
                .classList
                .add('active');

            $('variablesTab')
                .classList
                .remove('active');

            $('consoleView')
                .classList
                .remove('hidden');

            $('variablesView')
                .classList
                .add('hidden');

        }
    );


$('variablesTab')
    .addEventListener(
        'click',
        () => {

            $('variablesTab')
                .classList
                .add('active');

            $('consoleTab')
                .classList
                .remove('active');

            $('variablesView')
                .classList
                .remove('hidden');

            $('consoleView')
                .classList
                .add('hidden');

        }
    );


$('hintBtn')
    .addEventListener(
        'click',
        () => {

            showNotice(
                'Watch the head pointer. At each step, compare its value with the previous step.'
            );

        }
    );


document
    .querySelectorAll('.answer-btn')
    .forEach(button => {

        button.addEventListener(
            'click',
            () => {

                if (vivaAnswered) {
                    return;
                }

                vivaAnswered = true;

                const correct =
                    button.dataset.correct ===
                    'true';

                if (correct) {

                    button.classList.add(
                        'correct'
                    );

                    $('vivaScore')
                        .textContent =
                        'Score: 1/1';

                    $('vivaResult')
                        .textContent =
                        '✓ Correct. The next pointer stores the address of another node.';

                } else {

                    button.classList.add(
                        'incorrect'
                    );

                    $('vivaResult')
                        .textContent =
                        '✗ Incorrect. The next pointer stores the address of the next node.';
                }

            }
        );

    });


$('assessmentBtn')
    .addEventListener(
        'click',
        () => {

            showNotice(
                'Assessment will use execution, visualization and Viva results.'
            );

        }
    );


render();