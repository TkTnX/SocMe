import {
	UseMutationOptions,
	useMutation,
	useQuery
} from '@tanstack/react-query'

import {
	createComment,
	deleteComment,
	editComment,
	getPostComments
} from '@/api/requests'
import { CommentRequest, IComment } from '@/api/types'

export function useComments() {
	// ПОЛУЧЕНИЕ КОММЕНТАРИЕВ ПОСТА
	const getPostCommentsQuery = (postId: string) =>
		useQuery({
			queryKey: ['post comments', postId],
			queryFn: () => getPostComments(postId)
		})

	// СОЗДАНИЕ КОММЕНТАРИЯ
	const createCommentMutation = (
		postId: string,
		options?: Omit<
			UseMutationOptions<any, unknown, any>,
			'mutationKey' | 'mutationFn'
		>
	) =>
		useMutation({
			mutationKey: ['create comment', postId],
			mutationFn: (body: CommentRequest) => createComment(postId, body),
			...options
		})

	const editCommentMutation = (
		commentId: string,
		options?: Omit<
			UseMutationOptions<any, unknown, any>,
			'mutationKey' | 'mutationFn'
		>
	) =>
		useMutation({
			mutationKey: ['edit comment', commentId],
			mutationFn: (body: CommentRequest) => editComment(commentId, body),
			...options
		})

	// УДАЛЕНИЕ КОММЕНТАРИЯ
	const deleteCommentMutation = (
		commentId: string,
		options?: Omit<
			UseMutationOptions<any, unknown, any>,
			'mutationKey' | 'mutationFn'
		>
	) =>
		useMutation({
			mutationKey: ['delete comment', commentId],
			mutationFn: () => deleteComment(commentId),
			...options
		})

	return {
		getPostCommentsQuery,
		createCommentMutation,
		editCommentMutation,
		deleteCommentMutation
	}
}
