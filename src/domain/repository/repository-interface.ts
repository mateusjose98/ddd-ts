export default interface RepositoryInterface<T> {
  save(entity: T): void;
  update(entity: T): void;
  find(id: string): T;
  findAll(): T[];
}
