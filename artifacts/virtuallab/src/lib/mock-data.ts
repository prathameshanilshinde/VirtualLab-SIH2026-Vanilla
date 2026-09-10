export type Role = 'student' | 'faculty';

export type Practical = {
  id: string;
  title: string;
  course: string;
  topic: string;
  due: string;
  status: 'In progress' | 'Not started' | 'Submitted' | 'Published';
  progress?: number;
  submissions?: number;
  color: 'blue' | 'lime' | 'orange' | 'violet';
};

export const student = {
  name: 'Mira Shah',
  initials: 'MS',
  program: 'B.Tech · Computer Science',
  term: 'Semester 04',
  id: 'CS24-0417',
};

export const faculty = {
  name: 'Dr. Arjun Rao',
  initials: 'AR',
  department: 'Computer Science & IT',
  id: 'FAC-018',
};

export const studentPracticals: Practical[] = [
  { id: 'p1', title: 'Linked List Operations', course: 'Data Structures', topic: 'Linked Lists', due: 'Due in 2 days', status: 'Not started', progress: 0, color: 'blue' },
  { id: 'p2', title: 'Stack Implementation', course: 'Data Structures', topic: 'Stacks', due: 'Coming soon', status: 'Not started', progress: 0, color: 'orange' },
  { id: 'p3', title: 'Queue Implementation', course: 'Data Structures', topic: 'Queues', due: 'Coming soon', status: 'Not started', progress: 0, color: 'violet' },
  { id: 'p4', title: 'Binary Search Tree', course: 'Data Structures', topic: 'Trees', due: 'Coming soon', status: 'Not started', progress: 0, color: 'lime' },
];

export const recentActivity = [
  { id: 'a1', title: 'Array traversal & searching', detail: 'Checkpoint 03 completed', time: 'Today, 09:42', type: 'checkpoint' },
  { id: 'a2', title: 'Database Systems', detail: 'Practical submitted', time: 'Yesterday, 16:18', type: 'submit' },
  { id: 'a3', title: 'VirtualLab', detail: 'Joined Data Structures lab', time: '10 Mar, 11:05', type: 'join' },
];

export const facultyPracticals: Practical[] = [
  { id: 'f1', title: 'Linked List Operations', course: 'Data Structures', topic: 'Linked Lists', due: '18 Mar 2025', status: 'Published', submissions: 31, color: 'blue' },
  { id: 'f2', title: 'Stack Implementation', course: 'Data Structures', topic: 'Stacks', due: '21 Mar 2025', status: 'Published', submissions: 24, color: 'violet' },
  { id: 'f3', title: 'Queue Implementation', course: 'Data Structures', topic: 'Queues', due: '28 Mar 2025', status: 'Published', submissions: 0, color: 'orange' },
];

export const labs = [
  { name: 'Data Structures', code: 'CS204', description: 'Build intuition for the structures behind efficient programs.', available: true, experiments: 6, color: 'blue', symbol: '01' },
  { name: 'Operating Systems', code: 'CS305', description: 'See processes, memory, and scheduling from the inside.', available: false, experiments: 0, color: 'violet', symbol: '02' },
  { name: 'Database Systems', code: 'CS306', description: 'Query, model, and reason about data in motion.', available: false, experiments: 0, color: 'orange', symbol: '03' },
  { name: 'Computer Networks', code: 'CS307', description: 'Trace packets and protocols across the stack.', available: false, experiments: 0, color: 'lime', symbol: '04' },
  { name: 'Artificial Intelligence', code: 'CS401', description: 'Explore how models learn patterns from data.', available: false, experiments: 0, color: 'blue', symbol: '05' },
];

export const difficulties = [
  { label: 'Pointer manipulation', value: 72, note: 'Most common in linked structures' },
  { label: 'Recursion base cases', value: 54, note: 'Often missed in first attempts' },
  { label: 'SQL grouping logic', value: 38, note: 'Improving since last practical' },
];