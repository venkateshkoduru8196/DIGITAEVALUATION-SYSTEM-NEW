using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DIGITALEVALUATION.Exceptions;
using DIGITALEVALUATION.Services;
using System.Security.Claims;
using static DIGITALEVALUATION.Services.ServiceErrorType;

namespace DIGITALEVALUATION.Infrastructure
{
  
    public class DigitalEvaluationController : ControllerBase
    {
        protected string UserName
        {
            get => User.FindFirst(ClaimTypes.Name)!.Value;
        }

        protected IActionResult ProcessResult(ServiceResultBase result, Func<IActionResult> succesHandler)
        {
            if (result.Succeded && result.Error.ErrorType == None)
            {
                return succesHandler();
            }
            else if (result.Error.ErrorType == ServiceErrorType.Unauthorized)
            {
                return string.IsNullOrEmpty(result.Error.Message) ? Unauthorized() : Unauthorized(new { result.Error.Message });
            }
            else if (result.Error.ErrorType == EntityNotFound)
            {
                return string.IsNullOrEmpty(result.Error.Message) ? NotFound() : NotFound(new { result.Error.Message });
            }
            else if (result.Error.ErrorType is UserNotFound or BadModel or Unknown or Fault)
            {
                return string.IsNullOrEmpty(result.Error.Message) ? BadRequest() : BadRequest(new { result.Error.Message });
            }
            else
            {
                throw new ProcessResultException();
            }
        }


    }
}
