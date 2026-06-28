module.exports = {
  async openMockAuditConnection() {
    await delay(25);
    return { connected: true, source: 'mock-audit-service' };
  },

  async closeMockAuditConnection() {
    await delay(25);
    return { connected: false };
  },

  async clearMockSessionArtifacts() {
    await delay(25);
    return { cleared: true };
  },
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
