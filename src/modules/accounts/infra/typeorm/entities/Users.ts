import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
    id?: string;

  @Column()
    name: string;

  @Column()
    email: string;

  @Column()
    username?: string;

  @Column()
    password: string;

  @Column()
    driver_license: string;

  @Column()
    isAdmin: boolean;

  @Column()
    avatar?: string;

  @CreateDateColumn()
    created_at: Date;

  constructor () {
    if (this.id == null) {
      this.id = uuidv4();
    }
  }
}

export { User };
