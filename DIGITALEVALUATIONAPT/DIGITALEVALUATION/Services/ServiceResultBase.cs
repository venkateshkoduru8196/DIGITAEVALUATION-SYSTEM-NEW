namespace DIGITALEVALUATION.Services
{
	public abstract class ServiceResultBase
	{
		public ServiceError Error { get; init; } = new();

		public bool Succeded { get; init; } = false;
	}
}
