namespace DIGITALEVALUATION.Services
{
	public class ServiceError
	{
		public ServiceErrorType ErrorType { get; init; } = ServiceErrorType.None;

		public string? Message { get; init; }
	}
}
