const config = require("./config.js")
const pre = require("./pre.js")
module.exports = async (kernel) => {
  let script = {
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
        message: [
          "git clone https://github.com/cocktailpeanut/gligen-gui app",
        ]
      }
    }, {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "pip install flask"
        ],
      }
    }, {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/comfyanonymous/GLIGEN_pruned_safetensors/resolve/main/gligen_sd14_textbox_pruned.safetensors?download=true",
        dir: "https://github.com/cocktailpeanutlabs/comfyui.git/app/models/gligen"
      }
    }, {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors?download=true",
        dir: "https://github.com/cocktailpeanutlabs/comfyui.git/app/models/checkpoints"
      }
    }, {
      method: "fs.share",
      params: {
        venv: "app/env"
      }
    }, {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }]
  }
  let pre_command = pre(config, kernel)
  if (pre_command) {
    script.run[1].params.message = [pre_command].concat(script.run[1].params.message)
  }
  return script
}
