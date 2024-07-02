class ApiClient {
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
    const response = await fetch(`${this.rootPath}/api/session/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return (await response.json()).data;
  }

  async getUserStats(userId: string): Promise<UserStats> {
    const response = await fetch(`${this.rootPath}/api/stats/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return (await response.json()).data;
  }

  async getUserGoals(userId: string): Promise<Goal[]> {
    const response = await fetch(`${this.rootPath}/api/goals/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return (await response.json()).data.goals;
  }

  async getUserHistory(userId: string): Promise<Session[]> {
    const response = await fetch(`${this.rootPath}/api/history/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return (await response.json()).data;
  }

  async startUserSession(
    userId: string,
    work: string
  ): Promise<SessionCrudInfo> {
    const response = await fetch(`${this.rootPath}/api/start/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ work }),
    });
    return (await response.json()).data;
  }

  async togglePauseUserSession(userId: string): Promise<SessionCrudInfo> {
    const response = await fetch(`${this.rootPath}/api/pause/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return (await response.json()).data;
  }

  async cancelUserSession(userId: string): Promise<SessionCrudInfo> {
    const response = await fetch(`${this.rootPath}/api/cancel/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return (await response.json()).data;
  }
}

export { ApiClient };

export interface SessionCrudInfo {
  id: string;
  slackId: string;
  createdAt: string;
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

  /** Remaining **minutes** of session */
  remaining: number;
  endTime: string;
  goal: string;
  paused: boolean;
  completed: boolean;

  work: string;
}

export interface Status {
  activeSessions: number;
  airtableConnected: boolean;
  slackConnected: boolean;
}
