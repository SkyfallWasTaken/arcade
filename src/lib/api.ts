export default class {
  private apiKey: string;
  rootPath = "https://hackhour.hackclub.com";

  constructor(apiKey: string, rootPath?: string) {
    this.apiKey = apiKey;
    if (rootPath) {
      this.rootPath = rootPath;
    }
  }

  async isAlive() {
    const response = await fetch(`${this.rootPath}/ping`);
    return response.ok;
  }

  async getStatus(): Promise<Status> {
    const response = await fetch(`${this.rootPath}/status`);
    return await response.json();
  }

  async getLatestUserSession(userId: string): Promise<Session> {
    const response = await fetch(`${this.rootPath}/api/session/${userId}`);
    return (await response.json()).data;
  }

  async getUserStats(userId: string): Promise<UserStats> {
    const response = await fetch(`${this.rootPath}/api/stats/${userId}`);
    return (await response.json()).data;
  }

  async getUserGoals(userId: string): Promise<Goal[]> {
    const response = await fetch(`${this.rootPath}/api/goals/${userId}`);
    return (await response.json()).data.goals;
  }

  async getUserHistory(userId: string): Promise<Session[]> {
    const response = await fetch(`${this.rootPath}/api/history/${userId}`);
    return (await response.json()).data;
  }
}

export interface Goal {
  name: string;
  minutes: number;
}

export interface UserStats {
  sessions: number;
  total: number;
}

export interface Session {
  id: string;
  createdAt: string;
  time: number;
  elapsed: number;
  remaining: number;
  endTime: string;
  goal: string;
  paused: boolean;
  completed: boolean;
}

export interface Status {
  activeSessions: number;
  airtableConnected: boolean;
  slackConnected: boolean;
}
