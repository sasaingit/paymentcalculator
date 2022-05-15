import pmt from "formula-pmt"

class Constants {
    static LOAN_AMOUNT = 'loan_amount'
    static TOTAL_PAYBLE = 'total_payble'
    static TERMS = 'terms'
    static INPUT_VALUE = 'input_value'
    static MONTHS_PER_YEAR = 12
    static NUMBER_OF_DECIMAL_PLACES = 2
}

const ruleTypes = {
    percentage: {
        ruleName: "percentage",
        ruleMethod: function (params) {
            return pmt(params[Constants.INPUT_VALUE] / Constants.MONTHS_PER_YEAR, params[Constants.TERMS], params[Constants.LOAN_AMOUNT]).toFixed(Constants.NUMBER_OF_DECIMAL_PLACES)
        },
    },
    fixedPayment: {
        ruleName: "fixedPayment",
        ruleMethod: function (params) {
            return (params[Constants.TOTAL_PAYBLE] - params[Constants.INPUT_VALUE]).toFixed(Constants.NUMBER_OF_DECIMAL_PLACES)
        },
    },
    brokerFee: {
        ruleName: "brokerFee",
        ruleMethod: function (params) {
            return (params[Constants.TOTAL_PAYBLE] * (1 + (params[Constants.INPUT_VALUE] / Constants.MONTHS_PER_YEAR))).toFixed(Constants.NUMBER_OF_DECIMAL_PLACES)
        },
    }
}

export default ruleTypes