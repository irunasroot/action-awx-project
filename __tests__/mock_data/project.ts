const PROJECT_DATA = {
  id: 6,
  type: 'project',
  url: '/api/v2/projects/6/',
  related: {
    named_url: '/api/v2/projects/Demo Project++Default/',
    created_by: '/api/v2/users/1/',
    modified_by: '/api/v2/users/1/',
    teams: '/api/v2/projects/6/teams/',
    playbooks: '/api/v2/projects/6/playbooks/',
    inventory_files: '/api/v2/projects/6/inventories/',
    update: '/api/v2/projects/6/update/',
    project_updates: '/api/v2/projects/6/project_updates/',
    scm_inventory_sources: '/api/v2/projects/6/scm_inventory_sources/',
    schedules: '/api/v2/projects/6/schedules/',
    activity_stream: '/api/v2/projects/6/activity_stream/',
    notification_templates_started:
      '/api/v2/projects/6/notification_templates_started/',
    notification_templates_success:
      '/api/v2/projects/6/notification_templates_success/',
    notification_templates_error:
      '/api/v2/projects/6/notification_templates_error/',
    access_list: '/api/v2/projects/6/access_list/',
    object_roles: '/api/v2/projects/6/object_roles/',
    copy: '/api/v2/projects/6/copy/',
    organization: '/api/v2/organizations/1/'
  },
  summary_fields: {
    organization: {
      id: 1,
      name: 'Default',
      description: ''
    },
    created_by: {
      id: 1,
      username: 'admin',
      first_name: '',
      last_name: ''
    },
    modified_by: {
      id: 1,
      username: 'admin',
      first_name: '',
      last_name: ''
    },
    object_roles: {
      admin_role: {
        description: 'Can manage all aspects of the project',
        name: 'Admin',
        id: 16
      },
      use_role: {
        description: 'Can use the project in a job template',
        name: 'Use',
        id: 17
      },
      update_role: {
        description: 'May update the project',
        name: 'Update',
        id: 18
      },
      read_role: {
        description: 'May view settings for the project',
        name: 'Read',
        id: 19
      }
    },
    user_capabilities: {
      edit: true,
      delete: true,
      start: true,
      schedule: true,
      copy: true
    },
    resolved_environment: {
      id: 1,
      name: 'AWX EE (latest)',
      description: '',
      image: 'quay.io/ansible/awx-ee:latest'
    }
  },
  created: '2024-09-29T18:04:57.643929Z',
  modified: '2024-09-29T18:04:57.643939Z',
  name: 'Demo Project',
  description: '',
  local_path: '_6__demo_project',
  scm_type: 'git',
  scm_url: 'https://github.com/ansible/ansible-tower-samples',
  scm_branch: '',
  scm_refspec: '',
  scm_clean: false,
  scm_track_submodules: false,
  scm_delete_on_update: false,
  credential: null,
  timeout: 0,
  scm_revision: '347e44fea036c94d5f60e544de006453ee5c71ad',
  last_job_run: null,
  last_job_failed: false,
  next_job_run: null,
  status: 'successful',
  organization: 1,
  scm_update_on_launch: false,
  scm_update_cache_timeout: 0,
  allow_override: false,
  custom_virtualenv: null,
  default_environment: null,
  signature_validation_credential: null,
  last_update_failed: false,
  last_updated: null
}

const PROJECT_DATA_BY_NAME = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 6,
      type: 'project',
      url: '/api/v2/projects/6/',
      related: {
        created_by: '/api/v2/users/1/',
        modified_by: '/api/v2/users/1/',
        teams: '/api/v2/projects/6/teams/',
        playbooks: '/api/v2/projects/6/playbooks/',
        inventory_files: '/api/v2/projects/6/inventories/',
        update: '/api/v2/projects/6/update/',
        project_updates: '/api/v2/projects/6/project_updates/',
        scm_inventory_sources: '/api/v2/projects/6/scm_inventory_sources/',
        schedules: '/api/v2/projects/6/schedules/',
        activity_stream: '/api/v2/projects/6/activity_stream/',
        notification_templates_started:
          '/api/v2/projects/6/notification_templates_started/',
        notification_templates_success:
          '/api/v2/projects/6/notification_templates_success/',
        notification_templates_error:
          '/api/v2/projects/6/notification_templates_error/',
        access_list: '/api/v2/projects/6/access_list/',
        object_roles: '/api/v2/projects/6/object_roles/',
        copy: '/api/v2/projects/6/copy/',
        organization: '/api/v2/organizations/1/'
      },
      summary_fields: {
        organization: {
          id: 1,
          name: 'Default',
          description: ''
        },
        created_by: {
          id: 1,
          username: 'admin',
          first_name: '',
          last_name: ''
        },
        modified_by: {
          id: 1,
          username: 'admin',
          first_name: '',
          last_name: ''
        },
        object_roles: {
          admin_role: {
            description: 'Can manage all aspects of the project',
            name: 'Admin',
            id: 16
          },
          use_role: {
            description: 'Can use the project in a job template',
            name: 'Use',
            id: 17
          },
          update_role: {
            description: 'May update the project',
            name: 'Update',
            id: 18
          },
          read_role: {
            description: 'May view settings for the project',
            name: 'Read',
            id: 19
          }
        },
        user_capabilities: {
          edit: true,
          delete: true,
          start: true,
          schedule: true,
          copy: true
        }
      },
      created: '2024-09-29T18:04:57.643929Z',
      modified: '2024-09-29T18:04:57.643939Z',
      name: 'Demo Project',
      description: '',
      local_path: '_6__demo_project',
      scm_type: 'git',
      scm_url: 'https://github.com/ansible/ansible-tower-samples',
      scm_branch: '',
      scm_refspec: '',
      scm_clean: false,
      scm_track_submodules: false,
      scm_delete_on_update: false,
      credential: null,
      timeout: 0,
      scm_revision: '347e44fea036c94d5f60e544de006453ee5c71ad',
      last_job_run: null,
      last_job_failed: false,
      next_job_run: null,
      status: 'successful',
      organization: 1,
      scm_update_on_launch: false,
      scm_update_cache_timeout: 0,
      allow_override: false,
      custom_virtualenv: null,
      default_environment: null,
      signature_validation_credential: null,
      last_update_failed: false,
      last_updated: null
    }
  ]
}

const PROJECT_DATA_BY_NAME_NONE_FOUND = {
  count: 0,
  next: null,
  previous: null,
  results: []
}

export { PROJECT_DATA, PROJECT_DATA_BY_NAME, PROJECT_DATA_BY_NAME_NONE_FOUND }
