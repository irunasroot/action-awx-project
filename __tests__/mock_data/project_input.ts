import { CONTROLLER_INSTANCE } from './controller'
import { PROJECT_DATA } from './project'

const PROJECT_INPUT_DATA = {
  controller_url: CONTROLLER_INSTANCE.controller_url,
  controller_username: CONTROLLER_INSTANCE.controller_username,
  controller_password: CONTROLLER_INSTANCE.controller_password,
  controller_token: CONTROLLER_INSTANCE.controller_token,
  controller_timeout: CONTROLLER_INSTANCE.controller_timeout,
  controller_verify_certificate:
    CONTROLLER_INSTANCE.controller_verify_certificate,
  project_id: PROJECT_DATA.id,
  name: null,
  description: null,
  local_path: null,
  scm_type: null,
  scm_url: null,
  scm_branch: null,
  scm_refspec: null,
  scm_clean: null,
  scm_track_submodules: null,
  scm_delete_on_update: null,
  credential: null,
  timeout: null,
  organization: null,
  scm_update_on_launch: null,
  scm_update_cache_timeout: null,
  allow_override: null,
  default_environment: null,
  signature_validation_credential: null
}

const PROJECT_INPUT_DATA_ARRAY: [
  string,
  string,
  string,
  string,
  number,
  boolean,
  number | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  boolean | null,
  boolean | null,
  boolean | null,
  number | null,
  number | null,
  number | null,
  boolean | null,
  number | null,
  boolean | null,
  number | null,
  number | null
] = [
  PROJECT_INPUT_DATA.controller_url,
  PROJECT_INPUT_DATA.controller_username,
  PROJECT_INPUT_DATA.controller_password,
  PROJECT_INPUT_DATA.controller_token,
  PROJECT_INPUT_DATA.controller_timeout,
  PROJECT_INPUT_DATA.controller_verify_certificate,
  PROJECT_INPUT_DATA.project_id,
  PROJECT_INPUT_DATA.name,
  PROJECT_INPUT_DATA.description,
  PROJECT_INPUT_DATA.local_path,
  PROJECT_INPUT_DATA.scm_type,
  PROJECT_INPUT_DATA.scm_url,
  PROJECT_INPUT_DATA.scm_branch,
  PROJECT_INPUT_DATA.scm_refspec,
  PROJECT_INPUT_DATA.scm_clean,
  PROJECT_INPUT_DATA.scm_track_submodules,
  PROJECT_INPUT_DATA.scm_delete_on_update,
  PROJECT_INPUT_DATA.credential,
  PROJECT_INPUT_DATA.timeout,
  PROJECT_INPUT_DATA.organization,
  PROJECT_INPUT_DATA.scm_update_on_launch,
  PROJECT_INPUT_DATA.scm_update_cache_timeout,
  PROJECT_INPUT_DATA.allow_override,
  PROJECT_INPUT_DATA.default_environment,
  PROJECT_INPUT_DATA.signature_validation_credential
]

export { PROJECT_INPUT_DATA, PROJECT_INPUT_DATA_ARRAY }
