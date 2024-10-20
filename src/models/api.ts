import * as core from '@actions/core'
import axios from 'axios'
import https from 'https'
import http from 'http'

class ControllerApi {
  controller_url: string
  client: axios.AxiosInstance

  constructor(
    controller_url: string,
    controller_username: string,
    controller_password: string,
    controller_token: string,
    controller_timeout: number,
    controller_verify_certificate: boolean
  ) {
    core.debug(
      `Defaults for ControllerApi. URL: ${controller_url}; Username: ${controller_username ? '***' : ''}; Password: ${controller_password ? '***' : ''}; Token: ${controller_token ? '***' : ''}; Timeout: ${controller_timeout}; Verify Cert: ${controller_verify_certificate}`
    )

    if (!controller_url) {
      throw new Error('The controller_url was not provided')
    } else controller_url = new URL(controller_url).origin

    if (
      !(
        controller_url.startsWith('http://') ||
        controller_url.startsWith('https://')
      )
    ) {
      throw new Error(
        'The controller_url does not start with http:// or https://'
      )
    }

    if (!((controller_username && controller_password) || controller_token)) {
      throw new Error(
        'No authentication method was provided. Please provide controller_username/controller_password or a controller_token'
      )
    }

    this.controller_url = controller_url

    const axiosOptions: any = {
      baseURL: controller_url,
      timeout: controller_timeout,
      headers: {
        'Content-Type': 'application/json',
        Authorization: controller_token
          ? `Bearer ${controller_token}`
          : 'Basic ' + btoa(`${controller_username}:${controller_password}`)
      }
    }

    if (this.controller_url.startsWith('https')) {
      axiosOptions['httpsAgent'] = new https.Agent({
        rejectUnauthorized: controller_verify_certificate
      })
    } else {
      axiosOptions['httpAgent'] = new http.Agent({})
    }

    this.client = axios.create(axiosOptions)
  }

  async getProjectByName(name: string, organization: number): Promise<any> {
    // endpoint: /api/v2/projects?name=${name}&organization=${organization}
    core.debug('Getting Project by Name')
    core.debug(
      `API endpoint: /api/v2/projects?name=${name}&organization=${organization}`
    )

    return this.client
      .get(`/api/v2/projects`, {
        params: {
          name: name,
          organization: organization
        }
      })
      .then(response => {
        core.debug(`Response Successful: ${JSON.stringify(response.data)}`)
        if (response.data.count > 0) {
          return response.data.results[0]
        }
        return null
      })
      .catch(error => {
        core.debug(`Response Failed: ${error.message}`)
        if (error.response && error.response.status === 404) {
          return null
        }
        throw new Error(
          `Error trying to get project by name: ${error.message}.`
        )
      })
  }

  async getProjectById(project_id: number): Promise<any> {
    // endpoint: /api/v2/projects/${project_id}
    core.debug('Getting Project by ID')
    core.debug(`API endpoint: /api/v2/projects/${project_id}`)

    return this.client
      .get(`/api/v2/projects/${project_id}`)
      .then(response => {
        core.debug(`Response Successful: ${JSON.stringify(response.data)}`)
        return response.data
      })
      .catch(error => {
        core.debug(`Response Failed: ${error.message}`)
        if (
          error.response &&
          error.response.status === 404 &&
          error.response.data.detail === 'Not found.'
        ) {
          return null
        }
        throw new Error(`Error trying to get project by ID: ${error.message}.`)
      })
  }

  async createProject(payload: any): Promise<any> {
    // endpoint: `/api/v2/projects/`
    core.debug(`Creating Project`)
    core.debug(`API endpoint: /api/v2/projects/`)

    return this.client
      .post('/api/v2/projects/', payload)
      .then(response => {
        core.debug(`Response Successful: ${JSON.stringify(response.data)}`)
        return response.data
      })
      .catch(error => {
        core.debug(`Response Failed: ${error.message}`)
        throw new Error(`Error trying to create project: ${error.message}.`)
      })
  }

  async updateProject(project_id: number, payload: any): Promise<any> {
    // endpoint: `/api/v2/projects/${project_id}`
    core.debug(`Updating Project`)
    core.debug(`API endpoint: /api/v2/projects/${project_id}`)

    return this.client
      .put(`/api/v2/projects/${project_id}`, payload)
      .then(response => {
        core.debug(`Response Successful: ${JSON.stringify(response.data)}`)
        return response.data
      })
      .catch(error => {
        core.debug(`Response Failed: ${error.message}`)
        throw new Error(`Error trying to update project: ${error.message}.`)
      })
  }

  async sleep(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
}

export { ControllerApi }
