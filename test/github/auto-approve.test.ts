import { AutoApprove } from '../../src/github/auto-approve';
import { NodeProject, NodeProjectOptions } from '../../src/node-project';
import { synthSnapshot } from '../../src/util/synth';

describe('auto-approve', () => {
  test('default', () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      secret: 'MY_SECRET',
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot['.github/workflows/auto-approve.yml']).toBeDefined();
    expect(snapshot['.github/workflows/auto-approve.yml']).toMatchSnapshot();
  });

  test('configure options', () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      secret: 'MY_SECRET',
      label: 'my-approve',
      allowedUsernames: ['bot-1', 'bot-2'],
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot['.github/workflows/auto-approve.yml']).toMatchSnapshot();
  });

  test('all users', () => {
    const project = createProject();

    new AutoApprove(project.github!, {
      secret: 'MY_SECRET',
      allowedUsernames: [],
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot['.github/workflows/auto-approve.yml']).toMatchSnapshot();
  });
});

type ProjectOptions = Omit<NodeProjectOptions, 'outdir' | 'defaultReleaseBranch' | 'name'>;
function createProject(options: ProjectOptions = {}): NodeProject {
  return new NodeProject({
    defaultReleaseBranch: 'main',
    name: 'node-project',
    ...options,
  });
}