import * as pty from 'node-pty';

export function createPty(cmd: string) {
  const ptyProcess = pty.spawn(cmd, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env,
  });

  ptyProcess.onData((data) => {
    process.stdout.write(data);
  });

  ptyProcess.write('ls\r');
  ptyProcess.resize(100, 40);
  ptyProcess.write('ls\r');
}

createPty('ls');