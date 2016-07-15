/*
Copyright (c) 2016, David De Anda.  All rights reserved.
Copyrights licensed under MIT License
*/

class Camera extends Object3D
{

  constructor()
  {
    super()

    this.zoom = 0
    this.view_width = 0
    this.view_height = 0
    this.near = 0.01
    this.far = 1000
    this.projection_change = false
    this.projection_matrix = new Matrix4()
  }

  update(time)
  {
    super.update(time)
    if (this.projection_change)
    {
      this.projection_matrix.makePerspective(Math.toRadians(45 - 45 * this.zoom), this.view_width / this.view_height, this.near, this.far)
      m_projectionChange = false
    }
  }

  setZoom(zoom)
  {
    this.zoom = zoom
    this.projection_change = true
  }

  setClips(near, far)
  {
    this.near = near
    this.far = far
    this.projection_change = true
  }

  setViewSize(width, height)
  {
    this.view_width = width
    this.view_height = height
    this.projection_change = true
    this.update(0.0)
  }


}
