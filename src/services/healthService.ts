export function getHealthStatus(): { status: string; uptime: number } {
  return {
    status: 'ok',
    uptime: process.uptime(),
  };
}
