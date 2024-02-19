module.exports = {
  run: [{
    method: "fs.download",
    params: {
      uri: "{{input.uri}}",
      dir: "https://github.com/cocktailpeanutlabs/comfyui.git/app/models/checkpoints"
    }
  }]
}
