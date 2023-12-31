import { IEntityExistsRepository } from '../../common/repository/IEntityExistsRepository.js';
import { CommentDto } from '../../models/comment/commentDto.js';

export interface ICommentRepository extends IEntityExistsRepository {
  save(dto: CommentDto): Promise<CommentDto>;

  findById(id: string): Promise<CommentDto | null>;
}
