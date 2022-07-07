import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class MinigameSnowboardHero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'int' })
  turn: number;

  @Column({ type: 'int' })
  hCoin: number;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  @Column({ type: 'int' })
  totalPoint: number;

  @Column({ type: 'int' })
  maxPoint: number;

}
