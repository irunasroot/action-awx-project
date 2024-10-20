import * as core from '@actions/core'
import { ControllerApi } from './api'

class Project extends ControllerApi {
  project_id: number | null
  name: string | null
  description: string | null
  local_path: string | null
  scm_type: string | null
  scm_url: string | null
  scm_branch: string | null
  scm_refspec: string | null
  scm_clean: boolean | null
  scm_track_submodules: boolean | null
  scm_delete_on_update: boolean | null
  credential: number | null
  timeout: number | null
  organization: number | null
  scm_update_on_launch: boolean | null
  scm_update_cache_timeout: number | null
  allow_override: boolean | null
  default_environment: number | null
  signature_validation_credential: number | null

  constructor(
    controller_url: string,
    controller_username: string,
    controller_password: string,
    controller_token: string,
    controller_timeout: number,
    controller_verify_certificate: boolean,
    project_id: number | null,
    name: string | null,
    description: string | null,
    local_path: string | null,
    scm_type: string | null,
    scm_url: string | null,
    scm_branch: string | null,
    scm_refspec: string | null,
    scm_clean: boolean | null,
    scm_track_submodules: boolean | null,
    scm_delete_on_update: boolean | null,
    credential: number | null,
    timeout: number | null,
    organization: number | null,
    scm_update_on_launch: boolean | null,
    scm_update_cache_timeout: number | null,
    allow_override: boolean | null,
    default_environment: number | null,
    signature_validation_credential: number | null
  ) {
    super(
      controller_url,
      controller_username,
      controller_password,
      controller_token,
      controller_timeout,
      controller_verify_certificate
    )

    this.project_id = project_id
    this.name = name
    this.description = description
    this.local_path = local_path
    this.scm_type = scm_type
    this.scm_url = scm_url
    this.scm_branch = scm_branch
    this.scm_refspec = scm_refspec
    this.scm_clean = scm_clean
    this.scm_track_submodules = scm_track_submodules
    this.scm_delete_on_update = scm_delete_on_update
    this.credential = credential
    this.timeout = timeout
    this.organization = organization
    this.scm_update_on_launch = scm_update_on_launch
    this.scm_update_cache_timeout = scm_update_cache_timeout
    this.allow_override = allow_override
    this.default_environment = default_environment
    this.signature_validation_credential = signature_validation_credential

    if (!this.name) {
      throw new Error('Variable name was not provide')
    }

    if (!this.organization) {
      throw new Error('Variable organization was not provide')
    }

    if (
      this.scm_type === null ||
      (this.scm_type &&
        !['git', 'svn', 'insights', 'archive'].includes(this.scm_type))
    ) {
      throw new Error(
        "The scm_type input can only be one of 'git', 'svn', 'insights', or 'archive'"
      )
    }
  }

  _buildPayload(): any {
    const payload: any = {
      name: this.name,
      description: this.description,
      local_path: this.local_path,
      scm_type: this.scm_type,
      scm_url: this.scm_url,
      scm_branch: this.scm_branch,
      scm_refspec: this.scm_refspec,
      scm_clean: this.scm_clean,
      scm_track_submodules: this.scm_track_submodules,
      scm_delete_on_update: this.scm_delete_on_update,
      credential: this.credential,
      timeout: this.timeout,
      organization: this.organization,
      scm_update_on_launch: this.scm_update_on_launch,
      scm_update_cache_timeout: this.scm_update_cache_timeout,
      allow_override: this.allow_override,
      default_environment: this.default_environment,
      signature_validation_credential: this.signature_validation_credential
    }
    Object.keys(payload).forEach(k => payload[k] == null && delete payload[k])
    return payload
  }

  async run(): Promise<void> {
    let currentProject: any
    let project: any

    if (this.project_id) {
      currentProject = await this.getProjectById(this.project_id)
    } else if (this.name && this.organization) {
      currentProject = await this.getProjectByName(this.name, this.organization)
    }

    if (currentProject) {
      project = await this.updateProject(
        currentProject.id,
        this._buildPayload()
      )
      core.info(`The project ${project.id} was updated`)
    } else {
      project = await this.createProject(this._buildPayload())
      core.info(
        `The project '${project.name}' with ID '${project.id}' was created`
      )
    }

    core.info(
      `Project: ${this.controller_url}/#/projects/${project.id}/details`
    )
  }
}

export { Project }
