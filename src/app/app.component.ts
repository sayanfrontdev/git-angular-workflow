import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type TaskStatus = 'In progress' | 'Review' | 'Done';

interface Task {
  title: string;
  project: string;
  due: string;
  status: TaskStatus;
  initials: string;
  color: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  activeNav = 'Overview';
  activeFilter = 'All tasks';
  query = '';
  showNotifications = false;
  toastMessage = '';
  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  readonly navigation = [
    { label: 'Overview', icon: '⌂' },
    { label: 'My tasks', icon: '☷', badge: '4' },
    { label: 'Projects', icon: '▦' },
    { label: 'Calendar', icon: '▣' },
    { label: 'Messages', icon: '✉', badge: '2' }
  ];

  readonly projects = [
    { name: 'Website redesign', tag: 'Design', color: 'violet', progress: 72, due: 'May 28', people: ['AM', 'JL', 'SK'] },
    { name: 'Mobile app launch', tag: 'Product', color: 'blue', progress: 48, due: 'Jun 04', people: ['SK', 'DR', 'AM'] },
    { name: 'Brand guidelines', tag: 'Branding', color: 'orange', progress: 86, due: 'Jun 12', people: ['JL', 'AM'] }
  ];

  tasks: Task[] = [
    { title: 'Review homepage wireframes', project: 'Website redesign', due: 'Today', status: 'In progress', initials: 'AM', color: 'lavender', completed: false },
    { title: 'Update onboarding illustrations', project: 'Mobile app launch', due: 'Today', status: 'Review', initials: 'JL', color: 'peach', completed: false },
    { title: 'Share copy with the team', project: 'Website redesign', due: 'Tomorrow', status: 'In progress', initials: 'SK', color: 'mint', completed: false },
    { title: 'Finalize color palette', project: 'Brand guidelines', due: 'May 24', status: 'Done', initials: 'DR', color: 'sky', completed: true }
  ];

  get filteredTasks(): Task[] {
    const normalizedQuery = this.query.trim().toLowerCase();
    return this.tasks.filter((task) => {
      const matchesFilter = this.activeFilter === 'All tasks'
        || (this.activeFilter === 'In progress' && task.status === 'In progress')
        || (this.activeFilter === 'Completed' && task.completed);
      const matchesQuery = !normalizedQuery
        || `${task.title} ${task.project} ${task.status}`.toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }

  get remainingTaskCount(): number {
    return this.tasks.filter((task) => !task.completed).length;
  }

  selectNavigation(label: string): void {
    this.activeNav = label;
    if (label !== 'Overview') {
      this.showToast(`${label} view is ready to explore`);
    }
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  updateSearch(event: Event): void {
    this.query = (event.target as HTMLInputElement).value;
  }

  toggleTask(task: Task): void {
    task.completed = !task.completed;
    task.status = task.completed ? 'Done' : 'In progress';
  }

  addTask(): void {
    this.tasks = [
      {
        title: 'New task — add your details',
        project: 'Website redesign',
        due: 'Today',
        status: 'In progress',
        initials: 'YO',
        color: 'lavender',
        completed: false
      },
      ...this.tasks
    ];
    this.activeFilter = 'All tasks';
    this.query = '';
    this.showToast('A new task was added');
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  showToast(message: string): void {
    this.toastMessage = message;
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = setTimeout(() => {
      this.toastMessage = '';
    }, 2600);
  }
}
