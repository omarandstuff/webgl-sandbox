/*
Copyright (c) 2016, David De Anda.  All rights reserved.
Copyrights licensed under MIT License
*/

class Color
{

  constructor()
  {
    if(arguments[0] instanceof Array)
    {
      this.r = arguments[0][0]
      this.g = arguments[0][1]
      this.b = arguments[0][2]
      this.a = arguments[0][3]
    }
    else if(arguments.length == 1)
    {
      this.r = arguments[0]
      this.g = arguments[0]
      this.b = arguments[0]
      this.a = 1
    }
    else
    {
      this.r = arguments[0] || 0
      this.g = arguments[1] || 0
      this.b = arguments[2] || 0
      this.a = arguments[3] || 1
    }
  }

  clone()
  {
    return new Color(this.r, this.g, this.b, this.a)
  }

  copy(color)
  {
    this.r = color.r
    this.g = color.g
    this.b = color.b
    this.b = color.b

    return this
  }

  random(min, max)
  {
    if(min instanceof Color)
    {
      this.r = Random.Next(min.r, max.r)
      this.g = Random.Next(min.g, max.g)
      this.b = Random.Next(min.b, max.b)
      this.a = Random.Next(min.a, max.a)
    }
    else
    {
      this.r = Random.Next(min, max)
      this.g = Random.Next(min, max)
      this.b = Random.Next(min, max)
      this.a = Random.Next(min, max)
    }

    return this
  }

  static Random(min, max)
  {
    var result = new Color()

    return result.random(min, max)
  }

  equals(color)
  {
    return this.r === color.r && this.g === color.g && this.b === color.b && this.a === color.a
  }

  toArray()
  { 
    return [this.r, this.g, this.b, this.a]
  }

  writeInArray(array, index)
  {
    index = index || 0
    array[index] = this.r
    array[index + 1] = thix.g
    array[index + 2] = this.b
    array[index + 3] = this.a

    return array
  }

  loadFromAray(array, index)
  {
    index = index || 0
    this.r = array[index] || 0
    this.g = array[index + 1] || 0
    this.b = array[index + 2] || 0
    this.a = array[index + 3] || 0

    return this
  }

  static FromArray(array, index)
  {
    index = index || 0
    return new Color(array[index], array[index + 1], array[index + 2], array[index + 3])
  }

  toString()
  { 
    return "[" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + "]"
  }

}
