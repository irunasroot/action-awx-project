import * as core from '@actions/core'
import * as github from '@actions/github'

import { Project } from './models'

export async function run(): Promise<void> {
  const REPOSITORY_URL = `${github.context.serverUrl}/${github.context.repo.owner}/${github.context.repo.repo}`

  try {
    const inputValues = {
      project_id: core.getInput('project_id'),
      description: core.getInput('description'),
      local_path: core.getInput('local_path'),
      scm_type: core.getInput('scm_type'),
      scm_url: core.getInput('scm_url'),
      scm_branch: core.getInput('scm_branch'),
      scm_refspec: core.getInput('scm_refspec'),
      scm_clean: core.getInput('scm_clean'),
      scm_track_submodules: core.getInput('scm_track_submodules'),
      scm_delete_on_update: core.getInput('scm_delete_on_update'),
      credential: core.getInput('credential'),
      timeout: core.getInput('timeout'),
      organization: core.getInput('organization'),
      scm_update_on_launch: core.getInput('scm_update_on_launch'),
      scm_update_cache_timeout: core.getInput('scm_update_cache_timeout'),
      allow_override: core.getInput('allow_override'),
      default_environment: core.getInput('default_environment'),
      signature_validation_credential: core.getInput(
        'signature_validation_credential'
      )
    }

    const controller_url: string = core.getInput('controller_url', {
      required: true
    })
    const controller_username: string = core.getInput('controller_username')
    const controller_password: string = core.getInput('controller_password')
    const controller_token: string = core.getInput('controller_token')
    const controller_timeout = Number(core.getInput('controller_timeout'))
    const controller_verify_certificate: boolean = core.getBooleanInput(
      'controller_verify_certificate'
    )
    const project_id: number | null = inputValues.project_id
      ? Number(inputValues.project_id)
      : null
    const name: string = core.getInput('name', { required: true })
    const description: string | null = inputValues.description
      ? inputValues.description
      : null
    const local_path: string | null = inputValues.local_path
      ? inputValues.local_path
      : null
    const scm_type: string | null = inputValues.scm_type
      ? inputValues.scm_type
      : null
    const scm_url: string | null = inputValues.scm_url
      ? inputValues.scm_url
      : scm_type && scm_type === 'git'
        ? REPOSITORY_URL
        : null
    const scm_branch: string | null = inputValues.scm_branch
      ? inputValues.scm_branch
      : null
    const scm_refspec: string | null = inputValues.scm_refspec
      ? inputValues.scm_refspec
      : null
    const scm_clean: boolean | null = inputValues.scm_clean
      ? Boolean(inputValues.scm_clean)
      : null
    const scm_track_submodules: boolean | null =
      inputValues.scm_track_submodules
        ? Boolean(inputValues.scm_track_submodules)
        : null
    const scm_delete_on_update: boolean | null =
      inputValues.scm_delete_on_update
        ? Boolean(inputValues.scm_delete_on_update)
        : null
    const credential: number | null = inputValues.credential
      ? Number(inputValues.credential)
      : null
    const timeout: number | null = inputValues.timeout
      ? Number(inputValues.timeout)
      : null
    const organization = Number(
      core.getInput('organization', { required: true })
    )
    const scm_update_on_launch: boolean | null =
      inputValues.scm_update_on_launch
        ? Boolean(inputValues.scm_update_on_launch)
        : null
    const scm_update_cache_timeout: number | null =
      inputValues.scm_update_cache_timeout
        ? Number(inputValues.scm_update_cache_timeout)
        : null
    const allow_override: boolean | null = inputValues.allow_override
      ? Boolean(inputValues.allow_override)
      : null
    const default_environment: number | null = inputValues.default_environment
      ? Number(inputValues.default_environment)
      : null
    const signature_validation_credential: number | null =
      inputValues.signature_validation_credential
        ? Number(inputValues.signature_validation_credential)
        : null

    core.setSecret('controller_username')
    core.setSecret('controller_password')
    core.setSecret('controller_token')

    const project = new Project(
      controller_url,
      controller_username,
      controller_password,
      controller_token,
      controller_timeout,
      controller_verify_certificate,
      project_id,
      name,
      description,
      local_path,
      scm_type,
      scm_url,
      scm_branch,
      scm_refspec,
      scm_clean,
      scm_track_submodules,
      scm_delete_on_update,
      credential,
      timeout,
      organization,
      scm_update_on_launch,
      scm_update_cache_timeout,
      allow_override,
      default_environment,
      signature_validation_credential
    )

    await project.run()
  } catch (error: any) {
    core.setFailed(error.message)
  }
}
