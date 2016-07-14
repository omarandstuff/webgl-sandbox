/*
Copyright (c) 2016, David De Anda.  All rights reserved.
Copyrights licensed under MIT License
*/

class WebGLView
{

  constructor(canvas_id)
  {
    this.canvas = document.getElementById(canvas_id)
    this.context = null
    this.status = "loading_webgl"

    this.context = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl")

    if (!this.context)
    {
      this.status = "webgl_failed"
      Console.log("Unable to initialize WebGL.")
    }
    else
    {
      this.status = "active"

      this.background_color = new Color()
      this.context.clearColor(0.0, 0.0, 0.0, 1.0)

      window.addResizeListener(this.canvas, this.onCanvasResize.bind(this))
      this.onCanvasResize()

      this.context.enable(this.context.DEPTH_TEST)
      this.context.depthFunc(this.context.LEQUAL)

      this.render()
    }
  }

  dispose()
  {
    window.removeResizeListener(this.canvas, this.onCanvasResize.bind(this))
  }

  render()
  {
    this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT)

    window.requestAnimationFrame(this.render.bind(this))
  }

  setBackgroundColor(color)
  {
    this.background_color = color
    this.context.clearColor(color.r, color.g, color.b, color.a)
  }

  onCanvasResize()
  {
    this.canvas.width = this.canvas.style.width
    this.canvas.height = this.canvas.style.height
    this.context.viewport(0, 0, this.canvas.width, this.canvas.height)
  }

}
