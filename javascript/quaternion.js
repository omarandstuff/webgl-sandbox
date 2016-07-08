/*
Copyright (c) 2016, David De Anda.  All rights reserved.
Copyrights licensed under MIT License
*/

class Quaternion
{
  constructor()
  {
    if(arguments[0] instanceof Quaternion)
    {
      this.x = arguments[0].x
      this.y = arguments[0].y
      this.z = arguments[0].z
      this.w = arguments[0].w
    }
    else if(arguments[0] instanceof Array)
    {
      this.x = arguments[0][0]
      this.y = arguments[0][1]
      this.z = arguments[0][2]
      this.w = arguments[0][3]
    }
    else
    {
      for(var i = 0; i < 3; i++)
      {
        this[String.fromCharCode(120 + i)] = arguments[i] || 0
      }
      this.w = arguments[3] || 1
    }
  }

  clone()
  {
    return new Quaternion(this.x, this.y, this.z, this.w)
  }

  copy(quaternion)
  {
    this.x = quaternion.x
    this.y = quaternion.y
    this.z = quaternion.z
    this.w = quaternion.w

    return this
  }

  equals(quaternion)
  {
    return this.x === quaternion.x && this.y === quaternion.y && this.z === quaternion.z && this.w === quaternion.w
  }

  toArray()
  { 
    return [this.x, this.y, this.z, this.w]
  }

  writeInArray(array, index)
  {
    array[index] = this.x
    array[index + 1] = thix.y
    array[index + 2] = this.z
    array[index + 3] = this.w

    return array
  }

  loadFromAray(array, index = 0)
  {
    this.x = array[index] || 0
    this.y = array[index + 1] || 0
    this.z = array[index + 2] || 0
    this.w = array[index + 3] || 0

    return this
  }

  static FromArray(array, index = 0)
  {
    return new Quaternion(array[index], array[index + 1], array[index + 2], array[index + 3])
  }

  toString()
  { 
    return "[" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + "]"
  }

  
}
