# Action for creating an AWX/AAP Project

[![GitHub Super-Linter](https://github.com/irunasroot/action-awx-project/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/irunasroot/action-awx-project/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/irunasroot/action-awx-project/actions/workflows/check-dist.yml/badge.svg)](https://github.com/irunasroot/action-awx-project/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/irunasroot/action-awx-project/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/irunasroot/action-awx-project/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

Action for creating or updating an AWX/AAP project. The idea is for using this
is that a playbook project could self-register to AWX/AAP. If the project is
already created in AWX you can specify the project_id variable which will update
the project to match the configuration provided. If project_id is not provided,
the action will attempt to find a matching project by name and organization and
update accordingly. If its unable to find an existing project, the action will
attempt to create a new one.

Works with AWX v18 or above, and AAP v2 or above. This _should_ work with older
versions of AWX but not guaranteed.

## Usage

```yaml
- uses: irunasroot/action-awx-project@v1
  with:
    # The URL of AWX/AAP.
    # If using an insecure SSL certificate be sure to set
    #   controller_verify_certificate to false
    controller_url: ''

    # The username to log into the controller. One of username/password or
    #   token needs to be provided.
    controller_username: ''

    # The password to log into the controller. One of username/password or
    #   token needs to be provided.
    controller_password: ''

    # The token to authenticate to the controller. One of username/password or
    #   token needs to be provided.
    controller_token: ''

    # The timeout in milliseconds to wait for a call to the controller before
    #   erroring out.
    #   Note this is not a job execution timeout, but rather the timeout of
    #   the actual API calls to the controller
    # Defaults to 1000
    controller_timeout: ''

    # Verify if the controller's certificate is valid.
    # Defaults to true
    controller_verify_certificate: ''

    # The Project ID only set this if you already have a project defined.
    #   Running this action with project_is specified will keep it in sync with
    #   the rest of the settings defined in this action.
    project_id: ''

    # Name of this project.
    name: ''

    # Optional description of this project.
    description: ''

    # Local path (relative to PROJECTS_ROOT) containing playbooks and related
    #   files for this project. Type string
    local_path: ''

    # Specifies the source control system used to store the project. Can only
    #   be one of '', 'git', 'svn', 'insights', or 'archive'.
    # Defaults to git
    scm_type: ''

    # The location where the project is stored. If not specified this
    #   will be automatically discovered.
    scm_url: ''

    # Specific branch, tag or commit to checkout.
    scm_branch: ''

    # For git projects, an additional refspec to fetch.
    scm_refspec: ''

    # Discard any local changes before syncing the project.
    scm_clean: ''

    # Track submodules latest commits on defined branch.
    scm_track_submodules: ''

    # Delete the project before syncing.
    scm_delete_on_update: ''

    # Credential ID.
    credential: ''

    # The amount of time (in seconds) to run before the task is canceled.
    timeout: ''

    # The organization ID used to determine access to this template.
    # Defaults to 1 (The Default organization)
    organization: ''

    # Update the project when a job is launched that uses the project.
    scm_update_on_launch: ''

    # The number of seconds after the last project update ran that a new
    #   project update will be launched as a job dependency.
    scm_update_cache_timeout: ''

    # Allow changing the SCM branch or revision in a job template that uses
    #   this project.
    allow_override: ''

    # The default execution environment for jobs run using this project.
    default_environment: ''

    # An optional credential used for validating files in the project against
    #   unexpected changes.
    signature_validation_credential: ''
```

## Scenarios

### Launch a Job Template

```yaml
steps:
  - name: Create/Update AWX Project
    uses: irunasroot/action-awx-project@v1
    with:
      controller_url: https://awx.irunasroot.com
      controller_username: ${{ secrets.AWX_USERNAME }}
      controller_password: ${{ secrets.AWX_PASSWORD }}
      name: My super Project
      description: The best project ever!
```
