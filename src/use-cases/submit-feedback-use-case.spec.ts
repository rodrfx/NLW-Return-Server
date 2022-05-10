import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
	{ create: createFeedbackSpy },
	{ sendMail: sendMailSpy }
);

describe('submit feedback', () => {
	it('should be able to submit a feedback', async () => {
		const submitFeedback = new SubmitFeedbackUseCase(
			{ create: async () => {} },
			{ sendMail: async () => {} }
		);

		await expect(
			submitFeedback.execute({
				type: 'BUG',
				comment: 'test',
				screenshot: 'data:image/png;base64,imagetest',
			})
		).resolves.not.toThrow();

		expect(createFeedbackSpy).toHaveBeenCalled();
		expect(sendMailSpy).toHaveBeenCalled();
	});

	it('should not te able to submit feedback without type', async () => {
		await expect(
			submitFeedback.execute({
				type: '',
				comment: 'test',
				screenshot: 'data:image/png;base64,imagetest',
			})
		).rejects.toThrow();
	});

	it('should not te able to submit feedback without comment', async () => {
		await expect(
			submitFeedback.execute({
				type: 'BUG',
				comment: '',
				screenshot: 'data:image/png;base64,imagetest',
			})
		).rejects.toThrow();
	});

	it('should not te able to submit feedback with an invalid screenshot', async () => {
		await expect(
			submitFeedback.execute({
				type: 'BUG',
				comment: 'test',
				screenshot: 'test,jpg',
			})
		).rejects.toThrow();
	});
});
