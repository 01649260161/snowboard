import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany, JoinColumn, OneToOne, ManyToOne } from 'typeorm'
// import { WareHouse } from './WareHouse';
// import { House } from './House';
// import { Houses } from './Houses';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, comment: 'Số điện thoại của user.', unique: true })
  avatar: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: 'wallet address of user' })
  address: string;

  @Column({ type: 'int', default: 1, comment: 'current level of user, default = 1' })
  level: number;

  @Column({ type: 'double', default: 0, comment: 'deposit balance HPL token' })
  hplDeposit: number;

  @Column({ type: 'double', default: 0, comment: 'deposit balance HPW token' })
  hpwDeposit: number;

  @Column({ type: 'double', default: 0, unsigned: true, comment: 'reward HPL token' })
  hplReward: number;

  @Column({ type: 'double', default: 0, unsigned: true, comment: 'reward HPW token' })
  hpwReward: number;

  @Column({ type: 'bigint', nullable: true, comment: 'timestamp last login time' })
  lastLogin: number;

  @Column({ type: 'int', default: 0, comment: 'experient point' })
  expPoint: number;

  @Column({ type: 'int', default: 0, comment: 'status for this user, 0 is normal ; 1 is banned' })
  banned: number;

  @Column({ type: 'int', default: 0 })
  stoleTimesToday: number;

  @Column({ type: 'datetime', nullable: true })
  createdAt: Date

  @Column({ type: 'datetime', nullable: true })
  lastUpdatedAt: Date

  @Column({ type: 'double', default: 0 })
  hplSpend: number;

  @Column({ type: 'double', default: 0 })
  hpwSpend: number;

  @Column({ type: 'double', default: 0 })
  hplRewardClaimed: number;

  @Column({ type: 'double', default: 0 })
  hpwRewardClaimed: number;

  @Column({ type: 'bigint', default: 0 })
  disablePayToken: number;

  @Column({ type: 'bigint', default: 0 })
  disableExpiry: number;

  @Column({ type: 'int', default: 0 })
  needHelp: number;

  // @Column({ type: "varchar", length: 10000 })
  // filePositionJson: string;

  // @ManyToOne(() => WareHouse, wareHouse => wareHouse.user)
  // @JoinColumn()
  // wareHouse: WareHouse

  // @ManyToOne(() => House, house => house.user)
  // @JoinColumn()
  // house: House

  // @Column({ type: "varchar", length: 255, comment: "password..." })
  // password: string

  // @OneToMany(() => Notice, notice => notice.user)
  // notice: Notice[];

  // @OneToMany(() => Notice, notice => notice.friend)
  // noticeFriend: Notice[];

  // @ManyToMany(() => User)
  // @JoinTable()
  // friends: User[];
}
