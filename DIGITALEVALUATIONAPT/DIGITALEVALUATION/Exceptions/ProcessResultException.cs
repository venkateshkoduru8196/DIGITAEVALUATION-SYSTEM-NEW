namespace DIGITALEVALUATION.Exceptions
{
    public class ProcessResultException : Exception
    {
        public ProcessResultException()
        {
        }

        public ProcessResultException(string message)
            : base(message)
        {
        }

        public ProcessResultException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
