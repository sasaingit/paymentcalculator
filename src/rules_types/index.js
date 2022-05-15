import pmt from "formula-pmt"

class Constants {
    static LOAN_AMOUNT = 'loan_amount'
    static TOTAL_PAYBLE = 'total_payble'
    static TERMS = 'terms'
    static INPUT_VALUE = 'input_value'
    static MONTHS_PER_YEAR = 12
}

const ruleTypes = {
    percentage: {
        ruleName: "percentage",
        ruleMethod: function (params) {
            return pmt(params[Constants.INPUT_VALUE] / Constants.MONTHS_PER_YEAR, params[Constants.TERMS], params[Constants.LOAN_AMOUNT])
        },
    },
    fixedPayment: {
        ruleName: "fixedPayment",
        ruleMethod: function (params) {
            return params[Constants.TOTAL_PAYBLE] - params[Constants.INPUT_VALUE]
        },
    },
    brokerFee: {
        ruleName: "brokerFee",
        ruleMethod: function (params) {
            return params[Constants.TOTAL_PAYBLE] * (1 + (params[Constants.INPUT_VALUE] / Constants.MONTHS_PER_YEAR))
        },
    }
}

export default ruleTypes