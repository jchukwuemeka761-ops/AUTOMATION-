import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEnterpriseRoi,
  getWorkforceBreakdown,
  evaluateHumanInTheLoopRisk,
  generateSOWDocument,
} from './agent-swarm-logic';

test('calculateEnterpriseRoi computes correct payroll and savings for 100 workers', () => {
  const roi = calculateEnterpriseRoi(100, 60000, 1.25, 75000, 3500);

  // 100 * $60k = $6,000,000 payroll
  assert.equal(roi.traditionalAnnualPayroll, 6000000);

  // Total traditional cost with 1.25x overhead = $7,500,000
  assert.equal(roi.traditionalTotalCost, 7500000);
  assert.equal(roi.traditionalOverhead, 1500000);

  // Synapse first year = $75k license + ($3.5k * 12) = $75k + $42k = $117,000
  assert.equal(roi.synapseFirstYearCost, 117000);

  // Net first year savings = $7,500,000 - $117,000 = $7,383,000
  assert.equal(roi.netFirstYearSavings, 7383000);

  // Payback period in days: $117,000 / ($7,500,000 / 365) = ~5.7 days
  assert.ok(roi.paybackPeriodDays < 10, 'Payback period should be under 10 days for 100 workers');
  assert.ok(roi.roiPercentage > 5000, 'ROI percentage should exceed 5,000%');
});

test('getWorkforceBreakdown returns exactly 100 replaced headcount across squads', () => {
  const industries = ['ecommerce', 'technology', 'hospitality'] as const;

  for (const ind of industries) {
    const squads = getWorkforceBreakdown(ind);
    assert.equal(squads.length, 6, `Industry ${ind} should have 6 specialized squads`);

    const totalHeadcount = squads.reduce((sum, squad) => sum + squad.headcountReplaced, 0);
    assert.equal(totalHeadcount, 100, `Industry ${ind} squads must sum to exactly 100 headcount replaced`);
  }
});

test('evaluateHumanInTheLoopRisk properly classifies financial and operational risk tiers', () => {
  // Critical risk (> $10k or bulk refund)
  const critical = evaluateHumanInTheLoopRisk({
    type: 'BULK_REFUND_BATCH',
    amount: 15000,
  });
  assert.equal(critical.riskLevel, 'CRITICAL');
  assert.equal(critical.requiresApproval, true);

  // High risk ($2.5k - $9.9k)
  const high = evaluateHumanInTheLoopRisk({
    type: 'VENDOR_CONTRACT_AMENDMENT',
    amount: 4500,
  });
  assert.equal(high.riskLevel, 'HIGH');
  assert.equal(high.requiresApproval, true);

  // Low risk (< $500 standard automated action)
  const low = evaluateHumanInTheLoopRisk({
    type: 'STANDARD_TICKET_RESOLVE',
    amount: 0,
  });
  assert.equal(low.riskLevel, 'LOW');
  assert.equal(low.requiresApproval, false);
});

test('generateSOWDocument generates complete contract with valid figures', () => {
  const sow = generateSOWDocument({
    clientName: 'Yellow Chilli Dining Group',
    industry: 'hospitality',
    headcount: 100,
    avgSalary: 55000,
    turnkeyPrice: 85000,
  });

  assert.equal(sow.clientCompanyName, 'Yellow Chilli Dining Group');
  assert.equal(sow.turnkeyFee, 85000);
  assert.equal(sow.headcountTarget, 100);
  assert.ok(sow.contractId.startsWith('SYN-'));
  assert.ok(sow.projectedNetRoi > 0);
});
