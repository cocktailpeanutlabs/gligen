module.exports = async (kernel) => {
  let script = {
    daemon: true,
    run: [{
      method: "modal",
      params: {
        title: "ComfyUI",
        description: 'Gligen depends on ComfyUI. Make sure to launch ComfyUI before proceeding.',
        menu: [{
          text: "Start ComfyUI (If already installed)",
          href: '/pinokio/browser?uri=https://github.com/cocktailpeanutlabs/comfyui.git',
        }, {
          text: "Install ComfyUI",
          href: 'https://pinokio.computer/i?uri=https://github.com/cocktailpeanutlabs/comfyui',
        }]
      }
    }, {
      method: "shell.run",
      params: {
        path: "app",
        venv: "env",
        env: { },
        message: [
          kernel.platform === 'win32' ?  "flask --app gligen_gui:create_app(8188) run" : "flask --app 'gligen_gui:create_app(8188)' run"
        ],
        on: [{ "event": "/http:\/\/[0-9.:]+/", "done": true }]
      }
    }, {
      "method": "local.set",
      "params": {
        "url": "{{input.event[0]}}"
      }
    }, {
      "method": "proxy.start",
      "params": {
        "uri": "{{local.url}}",
        "name": "Local Sharing"
      }
    }]
  }
  return script
}
