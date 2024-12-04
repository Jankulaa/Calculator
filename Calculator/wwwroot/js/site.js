$(document).ready(function () {
    let currentInput = '';
    let operator = '';
    let operand1 = '';
    let operand2 = '';

    $(".btnClear").on("click", function () {
        currentInput = '';
        operand1 = '';
        operand2 = '';
        operator = '';
        $("#result").val('');
    });

    $(".btnEquals").on("click", function () {
        // Ensure operand2 gets the current input value
        operand2 = currentInput;

        // Check if operand1, operand2, and operator are valid
        if (operand1 === '' || operand2 === '' || operator === '') {
            $("#result").val("Error");
            return; // Prevent calculation if the values are not valid
        }

        // Send the calculation request to the server
        $.ajax({
            url: '/Calculator/Calculate',
            method: 'POST',
            data: {
                operand1: operand1,
                operand2: operand2,
                operatorSymbol: operator
            },
            success: function (result) {
                // Display the result in the input field
                $("#result").val(result);

                // Reset currentInput for next calculation
                currentInput = result;
                operand1 = result;  // Set operand1 to the result for chaining calculations
                operand2 = '';
                operator = '';
            },
            error: function () {
                // Handle errors (e.g., division by zero or other calculation errors)
                $("#result").val("Error");
            }
        });
    });

    $(".btnPlus, .btnMin, .btnMult, .btnDiv, .btnPerc").on("click", function () {
        operand1 = currentInput;
        operator = $(this).text(); // Get the operator symbol
        currentInput = '';
    });

    $(".btnSqrt").on("click", function () {
        currentInput = Math.pow(parseFloat(currentInput), 2).toString();
        $("#result").val(currentInput);
    });

    $(".btn0, .btn1, .btn2, .btn3, .btn4, .btn5, .btn6, .btn7, .btn8, .btn9, .btnComma").on("click", function () {
        currentInput += $(this).text();
        $("#result").val(currentInput);
    });
});
