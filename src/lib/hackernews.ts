import axios from 'axios';

const HN_API_BASE = process.env.HN_API_BASE_URL || 'https://hacker-news.firebaseio.com/v0';

export interface HnItem {
  id: number;
  deleted?: boolean;
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
  by?: string;
  time: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
}

export interface HnUser {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted: number[];
}

class HackerNewsAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = HN_API_BASE;
  }

  async getItem(id: number): Promise<HnItem | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/item/${id}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item ${id}:`, error);
      return null;
    }
  }

  async getUser(username: string): Promise<HnUser | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/user/${username}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${username}:`, error);
      return null;
    }
  }

  async getTopStories(): Promise<number[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/topstories.json`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching top stories:', error);
      return [];
    }
  }

  async getNewStories(): Promise<number[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/newstories.json`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching new stories:', error);
      return [];
    }
  }

  async getBestStories(): Promise<number[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/beststories.json`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching best stories:', error);
      return [];
    }
  }

  async getAskStories(): Promise<number[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/askstories.json`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching ask stories:', error);
      return [];
    }
  }

  async getJobStories(): Promise<number[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/jobstories.json`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching job stories:', error);
      return [];
    }
  }

  async getShowStories(): Promise<number[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/showstories.json`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching show stories:', error);
      return [];
    }
  }

  async getMaxItem(): Promise<number> {
    try {
      const response = await axios.get(`${this.baseUrl}/maxitem.json`);
      return response.data || 0;
    } catch (error) {
      console.error('Error fetching max item:', error);
      return 0;
    }
  }

  async getUpdates(): Promise<{ items: number[]; profiles: string[] }> {
    try {
      const response = await axios.get(`${this.baseUrl}/updates.json`);
      return response.data || { items: [], profiles: [] };
    } catch (error) {
      console.error('Error fetching updates:', error);
      return { items: [], profiles: [] };
    }
  }
}

export const hnApi = new HackerNewsAPI(); 