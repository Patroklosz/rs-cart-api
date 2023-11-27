import { Injectable } from '@nestjs/common';

interface Item {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  status: 'OPEN' | 'ORDERED';
}

import { Client } from 'pg';

@Injectable()
export class DatabaseService {
  private client: Client;
  private dbOptions = {
    user: 'postgres',
    host: process.env.POSTGRE_HOST,
    password: process.env.POSTGRE_PWD,
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  };

  constructor() {
    this.client = new Client(this.dbOptions);
  }

  async getCarts(userId: string): Promise<{ rows: Item[] }> {
    let query = 'SELECT * FROM carts';
    await this.connect();
    if (userId) {
      query = `SELECT * FROM carts WHERE user_id = '${userId}'`;
    }
    const request = await this.client.query(query);
    await this.client.end();
    return request;
  }

  async removeByUserId(userId: string) {
    if (!userId) {
      throw new Error('user_id is not provided!');
    }
    const query = `DELETE FROM carts WHERE user_id='${userId}'`;
    await this.connect();
    const res = await this.client.query(query);
    await this.client.end();
    return res;
  }

  private async connect() {
    try {
      await this.client.connect();
      console.log('Connected to the database');
    } catch (error) {
      throw new Error('Unable to connect to database: ' + error);
    }
  }
}
