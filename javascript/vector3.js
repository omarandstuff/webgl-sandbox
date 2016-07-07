/*
Copyright (c) 2016, David De Anda.  All rights reserved.
Copyrights licensed under MIT License
*/

class Vector3
{

  constructor()
  {
    if(arguments[0] instanceof Vector3)
    {
      this.x = arguments[0].x
      this.y = arguments[0].y
      this.z = arguments[0].z
    }
    else if(arguments[0] instanceof Array)
    {
      this.x = arguments[0][0]
      this.y = arguments[0][1]
      this.z = arguments[0][2]
    }
    else
    {
      for(var i = 0; i < 3; i++)
      {
        if(arguments.length == 3)
        {
          this[String.fromCharCode(120 + i)] = arguments[i]
        }
        else
        {
          this[String.fromCharCode(120 + i)] = 0
        }
      }
    }
  }

  magnitude()
  {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  sqrMagnitude()
  {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }

  normalize()
  {
    this.divScalar(this.magnitude())
  }

  invert()
  {
    this.x = -this.x
    this.y = -this.y
    this.z = -this.z
  }

  add(vector) 
  {
    this.x += vector.x
    this.y += vector.y
    this.z += vector.z
  }

  substract(vector)
  {
    this.x -= vector.x
    this.y -= vector.y
    this.z -= vector.z
  }

  mulScalar(scalar)
  {
    this.x *= scalar
    this.y *= scalar
    this.z *= scalar
  }

  divScalar(scalar)
  {
    this.x /= scalar
    this.y /= scalar
    this.z /= scalar
  }

  toArray()
  { 
    return [this.x, this.y, this.z]
  }

  toString()
  { 
    return "[" + this.x + ", " + this.y + ", " + this.z + "]"
  }

  static Add(left, right)
  {
    return new Vector3(left.x + right.x, left.y + right.y, left.z + right.z)
  }

  static Substract(left, right)
  {
    return new Vector3(left.x - right.x, left.y - right.y, left.z - right.z)
  }

  static Invert(vector)
  {
    return new Vector3(-vector.x, -vector.y, -vector.z)
  }

  static Cross(left, right)
  {
    return new Vector3(left.y * right.z - left.z * right.y, left.z * right.x - left.x * right.z, left.x * right.y - left.y * right.x)
  }

  static Dot(left, right)
  {
    return left.x * right.x + left.y * right.y + left.z * right.z
  }

  static MulScalar(vector, scalar)
  {
    return new Vector3(vector.x * scalar, vector.y * scalar, vector.z * scalar)
  }

  static DivScalar(vector, scalar)
  {
    return new Vector3(vector.x / scalar, vector.y / scalar, vector.z / scalar)
  }

  static Normaliz(vector)
  {
    return Vector3.DivScalar(vector, vector.magnitude())
  }

  static Distance(from, to)
  {
    return Vector3.Substract(from, to).magnitude()
  }

  static Lerp(left, right, time)
  {
    return Vector3.Add(Vector3.MulScalar(left, 1 - time), Vector3.MulScalar(right, time))
  }

  static front()
  {
    return new Vector3(0, 0, 1)
  }

  static back()
  {
    return new Vector3(0, 0, -1)
  }

  static right()
  {
    return new Vector3(1, 0, 0)
  }

  static left()
  {
    return new Vector3(-1, 0, 0)
  }

  static top()
  {
    return new Vector3(0, 1, 0)
  }

  static bottom()
  {
    return new Vector3(0, -1, 0)
  }

};
