
/* IMPORT */

import * as _ from 'lodash';
import * as octokit from '@octokit/rest';
import * as path from 'path';
import * as username from 'git-username';
import fetchKeywords from './keywords';

/* GITHUB SYNC KEYWORDS */

const defaultOptions = {
  token: ''
};

function factory ( customOptions?: Partial<typeof defaultOptions> ) {

  const options = Object.assign ( {}, defaultOptions, customOptions );

  async function githubSyncKeywords ( config, repoPath, ctx, task ) {

    if ( !options.token ) return task.skip ( 'You need to provide a GitHub token' );

    const name = path.basename ( repoPath ),
          keywords = await fetchKeywords ( repoPath );

    if ( !keywords ) return task.skip ( 'Couldn\'t find any keywords' );

    const owner = username ({ cwd: repoPath });

    if ( !owner ) return task.skip ( 'Couldn\'t find the GitHub owner' );

    const github = new octokit ();

    github.authenticate ({
      type: 'token',
      token: options.token
    });

    try {

      const topics = await github.repos['getTopics']({ owner, repo: name }); //TSC

      if ( _.isEqual ( topics.data.names, keywords ) ) return task.skip ( 'No need to update the keywords' );

      try {

        task.output = 'Updating the keywords...';

        if ( config.dry ) return task.skip ();

        await github.repos.replaceTopics ({ owner, repo: name, names: keywords });

        task.output = `Keywords updated to "${keywords.join ( ', ' )}"`;

      } catch ( e ) {

        return task.skip ( 'Couldn\'t update the keywords' );

      }

    } catch ( e ) {

      return task.skip ( 'Couldn\'t find the GitHub repository' );

    }

  };

  githubSyncKeywords['title'] = 'github sync keywords';

  return githubSyncKeywords;

}

/* EXPORT */

export default factory;
