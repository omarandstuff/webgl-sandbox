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
    else if(arguments.length == 1)
    {
      this.x = arguments[0]
      this.y = arguments[0]
      this.z = arguments[0]
    }
    else
    {
      for(var i = 0; i < 3; i++)
      {
        this[String.fromCharCode(120 + i)] = arguments[i] || 0
      }
    }
  }

  clone()
  {
    return new Vector3(this.x, this.y, this.z)
  }

  copy(vector)
  {
    this.x = vector.x
    this.y = vector.y
    this.z = vector.z

    return this
  }

  random(min, max)
  {
    if(min instanceof Vector3)
    {
      this.x = Random.Next(min.x, max.x)
      this.y = Random.Next(min.y, max.y)
      this.z = Random.Next(min.z, max.z)
    }
    else
    {
      this.x = Random.Next(min, max)
      this.y = Random.Next(min, max)
      this.z = Random.Next(min, max)
    }

    return this
  }

  static Random(min, max)
  {
    if(min instanceof Vector3)
      return new Vector3(Random.Next(min.x, max.x), Random.Next(min.y, max.y), Random.Next(min.z, max.z))
    else
      return new Vector3(Random.Next(min, max), Random.Next(min, max), Random.Next(min, max))
  }

  equals(vector)
  {
    return this.x === vector.x && this.y === vector.y && this.z === vector.z
  }

  toArray()
  { 
    return [this.x, this.y, this.z]
  }

  writeInArray(array, index)
  {
    array[index] = this.x
    array[index + 1] = thix.y
    array[index + 2] = this.z

    return array
  }

  loadFromAray(array, index)
  {
    this.x = array[index] || 0
    this.y = array[index + 1] || 0
    this.z = array[index + 2] || 0

    return this
  }

  static FromArray(array, index)
  {
    return new Vector3(array[index], array[index + 1], array[index + 2])
  }

  toString()
  { 
    return "[" + this.x + ", " + this.y + ", " + this.z + "]"
  }

  length()
  {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  sqrLength()
  {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }

  manhattanLength()
  {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
  }

  normalize()
  {
    return this.divide(this.length())
  }

  static Normalized(vector)
  {
    return Vector3.Divide(vector, vector.length())
  }

  setLength(length)
  {
    return this.muliply(length / this.length())
  }

  static WithLength(vector, length)
  {
    return Vector3.Multiply(vector, length / vector.length())
  }

  clampLength(min, max)
  {
    var length = this.length()

    return this.muliply(Math.clamp(length, min, max) / length)
  }

  static WithClampedLength(vector, min, max)
  {
    var length = vector.length()

    return Vector3.Multiply(vector, Math.clamp(length, min, max) / length)
  }

  sqrDistance(vector)
  {
    return Vector3.SqrDistance(this, vector)
  }

  static SqrDistance(from, to)
  {
    var dx = to.x - from.x
    var dy = to.y - from.y
    var dz = to.z - from.z

    return dx * dx + dy * dy + dz * dz
  }

  distance(vector)
  {
    return Math.sqrt(this.sqrDistance(vector))
  }

  static Distance(from, to)
  {
    return Math.sqrt(Vector3.SqrDistance(from, to))
  }

  angle(vector)
  {
    var theta = this.dot(vector) / Math.sqrt(this.sqrLength() * vector.sqrLength())

    return Math.acos(Math.clamp(theta, -1, 1))
  }

  static Angle(from, to)
  {
    return from.angle(to)
  }

  add(factor) 
  {
    if(factor instanceof Vector3)
    {
      this.x += factor.x
      this.y += factor.y
      this.z += factor.z
    }
    else
    {
      this.x += factor
      this.y += factor
      this.z += factor
    }

    return this
  }

  static Add(vector, factor)
  {
    if(factor instanceof Vector3)
      return new Vector3(vector.x + factor.x, vector.y + factor.y, vector.z + factor.z)
    else
      return new Vector3(vector.x + factor, vector.y + factor, vector.z + factor)
  }

  sub(factor)
  {
    if(factor instanceof Vector3)
    {
      this.x -= factor.x
      this.y -= factor.y
      this.z -= factor.z
    }
    else
    {
      this.x -= factor
      this.y -= factor
      this.z -= factor
    }

    return this
  }

  static Sub(vector, factor)
  {
    if(factor instanceof Vector3)
      return new Vector3(vector.x - factor.x, vector.y - factor.y, vector.z - factor.z)
    else
      return new Vector3(vector.x - factor, vector.y - factor, vector.z - factor)
  }

  negate()
  {
    this.x = -this.x
    this.y = -this.y
    this.z = -this.z

    return this
  }

  static Negated(vector)
  {
    return new Vector3(-vector.x, -vector.y, -vector.z)
  }

  muliply(factor)
  {
    if(factor instanceof Vector3)
    {
      this.x *= factor.x
      this.y *= factor.y
      this.z *= factor.z
    }
    else
    {
      this.x *= factor
      this.y *= factor
      this.z *= factor
    }

    return this
  }

  static Multiply(vector, factor)
  {
    if(factor instanceof Vector3)
      return new Vector3(vector.x * factor.x, vector.y * factor.y, vector.z * factor.z)
    else
      return new Vector3(vector.x * factor, vector.y * factor, vector.z * factor)
  }

  divide(factor)
  {
    if(factor instanceof Vector3)
    {
      this.x /= factor.x
      this.y /= factor.y
      this.z /= factor.z
    }
    else
    {
      this.x /= factor
      this.y /= factor
      this.z /= factor
    }

    return this
  }

  static Divide(vector, factor)
  {
    if(factor instanceof Vector3)
      return new Vector3(vector.x / factor.x, vector.y / factor.y, vector.z / factor.z)
    else
      return new Vector3(vector.x / factor, vector.y / factor, vector.z / factor)
  }

  cross(vector)
  {
    this.x = this.y * vector.z - this.z * vector.y
    this.y = this.z * vector.x - this.x * vector.z
    this.z = this.x * vector.y - this.y * vector.x

    return this
  }

  static Cross(left, right)
  {
    return new Vector3(left.y * right.z - left.z * right.y,
                       left.z * right.x - left.x * right.z,
                       left.x * right.y - left.y * right.x)
  }

  dot(vector)
  {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z
  }

  static Dot(left, right)
  {
    return left.x * right.x + left.y * right.y + left.z * right.z
  }

  clamp(min, max)
  {
    this.x = Math.clamp(this.x, min.x, max.x)
    this.y = Math.clamp(this.y, min.y, max.y)
    this.z = Math.clamp(this.z, min.z, max.z)

    return this
  }

  static Clamped(vector, min, max)
  {
    return new Vector3(Math.clamp(vector.x, min.x, max.x),
                       Math.clamp(vector.y, min.y, max.y),
                       Math.clamp(vector.z, min.z, max.z))
  }

  floor()
  {
    this.x = Math.floor(this.x)
    this.y = Math.floor(this.y)
    this.z = Math.floor(this.z)

    return this
  }

  static Floor(vector)
  {
    return new Vector3(Math.floor(vector.x), Math.floor(vector.y), Math.floor(vector.z))
  }

  ceil()
  {
    this.x = Math.ceil(this.x)
    this.y = Math.ceil(this.y)
    this.z = Math.ceil(this.z)

    return this
  }

  static Ceil(vector)
  {
    return new Vector3(Math.ceil(vector.x), Math.ceil(vector.y), Math.ceil(vector.z))
  }

  round()
  {
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
    this.z = Math.round(this.z)

    return this
  }

  static Round(vector)
  {
    return new Vector3(Math.round(vector.x), Math.round(vector.y), Math.round(vector.z))
  }

  roundToOrigin()
  {
    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)
    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)
    this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)

    return this
  }

  static RoundToOrigin(vector)
  {
    return new Vector3(vector.x < 0 ? Math.ceil(vector.x) : Math.floor(vector.x),
                       vector.y < 0 ? Math.ceil(vector.y) : Math.floor(vector.y),
                       vector.z < 0 ? Math.ceil(vector.z) : Math.floor(vector.z))
  }

  min(vector)
  {
    this.x = Math.min(this.x, vector.x)
    this.y = Math.min(this.y, vector.y)
    this.z = Math.min(this.z, vector.z)

    return this
  }

  static Min(left, right)
  {
    return new Vector3(Math.min(left.x, right.x), Math.min(left.y, right.y), Math.min(left.z, right.z))
  }

  max(vector)
  {
    this.x = Math.max(this.x, vector.x)
    this.y = Math.max(this.y, vector.y)
    this.z = Math.max(this.z, vector.z)

    return this
  }

  static Max(left, right)
  {
    return new Vector3(Math.max(left.x, right.x), Math.max(left.y, right.y), Math.max(left.z, right.z))
  }

  lerp(vector, alpha)
  {
    this.x += (vector.x - this.x) * alpha
    this.y += (vector.y - this.y) * alpha
    this.z += (vector.z - this.z) * alpha

    return this
  }

  static Lerp(from, to, alpha)
  {
    return Vector3.Sub(to, from).muliply(alpha).add(from)
  }

  project(onNormal)
  {
    var factor = onNormal.dot(this) / onNormal.sqrLength()

    return this.copy(onNormal).muliply(factor)
  }

  static Projected(vector, onNormal)
  {
    return Vector3.Multiply(onNormal, onNormal.dot(vector) / onNormal.sqrLength())
  }

  projectOnPlane(planeNormal)
  {
    return this.sub(Vector3.Projected(this, planeNormal))
  }

  static ProjectedOnPlane(vector, on)
  {
    return Vector3.Sub(vector, Vector3.Projected(vector, on))
  }

  reflect(normal)
  {
    return this.sub(Vector3.Multiply(normal, 2 * this.dot(normal)))
  }

  static Reflected(vector, normal)
  {
    return Vector3.Sub(vector, Vector3.Multiply(normal, 2 * vector.dot(normal)))
  }

  transform(trasformer)
  {
    if(trasformer instanceof Matrix4)
    {
      this.x = trasformer.elements[0] * this.x + trasformer.elements[4] * this.y + trasformer.elements[8] * this.z + trasformer.elements[12]
      this.y = trasformer.elements[1] * this.x + trasformer.elements[5] * this.y + trasformer.elements[9] * this.z + trasformer.elements[13]
      this.z = trasformer.elements[2] * this.x + trasformer.elements[6] * this.y + trasformer.elements[10] * this.z + trasformer.elements[14]
    }

    return this
  }

  static Transformed(vector, trasformer)
  {
    var result = new Vector3(vector)

    return result.transform(trasformer)
  }

  static forward()
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

  static up()
  {
    return new Vector3(0, 1, 0)
  }

  static down()
  {
    return new Vector3(0, -1, 0)
  }

  static one()
  {
    return new Vector3(1, 1, 1)
  }
}
