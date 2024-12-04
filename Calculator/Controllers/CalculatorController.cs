using Calculator.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Calculator.Controllers
{
	public class CalculatorController : Controller
	{
		private readonly ILogger<CalculatorController> _logger;

		public CalculatorController(ILogger<CalculatorController> logger)
		{
			_logger = logger;
		}

		public IActionResult Index()
		{
			return View();
		}

        [HttpPost]
        public IActionResult Calculate(string operand1, string operand2, string operatorSymbol)
        {
            try
            {
                double num1 = Convert.ToDouble(operand1);
                double num2 = Convert.ToDouble(operand2);
                double result = 0;

                switch (operatorSymbol)
                {
                    case "+":
                        result = num1 + num2;
                        break;
                    case "-":
                        result = num1 - num2;
                        break;
                    case "*":
                        result = num1 * num2;
                        break;
                    case "/":
                        if (num2 != 0)
                            result = num1 / num2;
                        else
                            return Json("Error: Division by Zero");
                        break;
                    case "%":
                        result = (num1 * num2) / 100;
                        break;
                    default:
                        return Json("Invalid Operator");
                }

                return Json(result);
            }
            catch (Exception ex)
            {
                // Return error message in case of any unexpected errors
                return Json("Error: " + ex.Message);
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}
