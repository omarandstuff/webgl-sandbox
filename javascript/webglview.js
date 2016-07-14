/*
Copyright (c) 2016, David De Anda.  All rights reserved.
Copyrights licensed under MIT License
*/

class WebGLView
{

  constructor(canvas_id)
  {
    this.canvas = document.getElementById(canvas_id)
    this.canvas_wrap = document.getElementById(canvas_id + "-wrap")
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

      window.addResizeListener(this.canvas_wrap, this.onCanvasResize.bind(this))
      this.width = this.canvas.width
      this.height = this.canvas.height
      this.canvas_change = false

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
    if(this.canvas_change)
    {
      this.setSize(this.width, this.height)
    }

    this.context.clear(this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT)

    window.requestAnimationFrame(this.render.bind(this))
  }

  setBackgroundColor(color)
  {
    this.background_color = color
    this.context.clearColor(color.r, color.g, color.b, color.a)
  }

  setSize(width, height)
  {
    this.width = width
    this.height = height

    this.canvas.width = this.canvas.clientWidth
    this.canvas.height = this.canvas.clientHeight

    this.context.viewport(0, 0, this.canvas.width, this.canvas.height)

    this.canvas_change = false
  }

  onCanvasResize()
  {
    this.width = this.canvas.clientWidth
    this.height = this.canvas.clientHeight
    this.canvas_change = true
  }

}
