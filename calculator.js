document.addEventListener('DOMContentLoaded', () => {
    const capacityInput = document.getElementById('capacity');
    const efficiencyInput = document.getElementById('efficiency');
    const peakValleyDiffInput = document.getElementById('peakValleyDiff');
    const valleyPriceInput = document.getElementById('valleyPrice');
    const cyclesPerDayInput = document.getElementById('cyclesPerDay');
    const initialInvestmentInput = document.getElementById('initialInvestment');
    const systemLifespanInput = document.getElementById('systemLifespan');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', () => {
        const capacity = parseFloat(capacityInput.value);
        const efficiency = parseFloat(efficiencyInput.value) / 100;
        const peakValleyDiff = parseFloat(peakValleyDiffInput.value);
        const valleyPrice = parseFloat(valleyPriceInput.value);
        const cyclesPerDay = parseInt(cyclesPerDayInput.value);
        const initialInvestment = parseFloat(initialInvestmentInput.value);
        const systemLifespan = parseInt(systemLifespanInput.value);

        if ([capacity, efficiency, peakValleyDiff, valleyPrice, cyclesPerDay, initialInvestment, systemLifespan].some(isNaN)) {
            resultDiv.textContent = '请输入有效的数值';
            resultDiv.style.display = 'block';
            return;
        }

        const dailyChargeAmount = capacity * cyclesPerDay;
        const dailyDischargeAmount = dailyChargeAmount * efficiency;

        const dailyChargeCost = dailyChargeAmount * valleyPrice;
        const dailyDischargeIncome = dailyDischargeAmount * (valleyPrice + peakValleyDiff);

        const dailyProfit = dailyDischargeIncome - dailyChargeCost;
        const monthlyProfit = dailyProfit * 30;
        const yearlyProfit = monthlyProfit * 12;

        const totalProfit = yearlyProfit * systemLifespan;
        const roi = ((totalProfit - initialInvestment) / initialInvestment) * 100;
        const paybackPeriod = initialInvestment / yearlyProfit;

        const annualDegradation = 0.02; // 假设每年效率下降2%
        let cumulativeProfit = 0;
        for (let year = 1; year <= systemLifespan; year++) {
            cumulativeProfit += yearlyProfit * Math.pow(1 - annualDegradation, year - 1);
        }

        resultDiv.innerHTML = `
            <p><span>每日充电量:</span> <span>${dailyChargeAmount.toFixed(2)} kWh</span></p>
            <p><span>每日放电量:</span> <span>${dailyDischargeAmount.toFixed(2)} kWh</span></p>
            <p><span>每日充电成本:</span> <span>¥${dailyChargeCost.toFixed(2)}</span></p>
            <p><span>每日放电收入:</span> <span>¥${dailyDischargeIncome.toFixed(2)}</span></p>
            <p><span>每日利润:</span> <span>¥${dailyProfit.toFixed(2)}</span></p>
            <p><span>每月利润:</span> <span>¥${monthlyProfit.toFixed(2)}</span></p>
            <p><span>每年利润:</span> <span>¥${yearlyProfit.toFixed(2)}</span></p>
            <p><span>总利润 (${systemLifespan}年):</span> <span>¥${totalProfit.toFixed(2)}</span></p>
            <p><span>考虑效率衰减后的总利润:</span> <span>¥${cumulativeProfit.toFixed(2)}</span></p>
            <p><span>投资回报率 (ROI):</span> <span>${roi.toFixed(2)}%</span></p>
            <p><span>投资回收期:</span> <span>${paybackPeriod.toFixed(2)} 年</span></p>
            <p><span>每kWh储能的年收益:</span> <span>¥${(yearlyProfit / capacity).toFixed(2)}</span></p>
        `;
        resultDiv.style.display = 'block';
    });
});