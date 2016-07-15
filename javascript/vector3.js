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
    var result = new Vector3()

    return result.random(min, max)
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
    index = index || 0
    array[index] = this.x
    array[index + 1] = thix.y
    array[index + 2] = this.z

    return array
  }

  loadFromAray(array, index)
  {
    index = index || 0
    this.x = array[index] || 0
    this.y = array[index + 1] || 0
    this.z = array[index + 2] || 0

    return this
  }

  static FromArray(array, index)
  {
    index = index || 0
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
    var result = new Vector3(vector)

    return result.clampLength(min, max)
  }

  sqrDistance(vector)
  {
    var dx = vector.x - this.x
    var dy = vector.y - this.y
    var dz = vector.z - this.z

    return dx * dx + dy * dy + dz * dz
  }

  static SqrDistance(from, to)
  {
    return from.sqrDistance(to)
  }

  distance(vector)
  {
    return Math.sqrt(this.sqrDistance(vector))
  }

  static Distance(from, to)
  {
    return Math.sqrt(from.sqrDistance(to))
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
    var result = new Vector3(vector)

    return result.add(factor)
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
    var result = new Vector3(vector)

    return result.sub(factor)
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
    var result = new Vector3(vector)

    return result.muliply(factor)
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
    var result = new Vector3(vector)

    return result.divide(factor)
  }

  cross(vector)
  {
    var x = this.x
    var y = this.y
    var z = this.z

    this.x = y * vector.z - z * vector.y
    this.y = z * vector.x - x * vector.z
    this.z = x * vector.y - y * vector.x

    return this
  }

  static Cross(left, right)
  {
    var result = new Vector3(left)

    return result.cross(right)
  }

  dot(vector)
  {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z
  }

  static Dot(left, right)
  {
    return left.dot(right)
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
    var result = new Vector3(vector)

    return result.clamp(min. max)
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
    var result = new Vector3(vector)

    return result.floor()
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
    var result = new Vector3(vector)

    return result.ceil()
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
    var result = new Vector3(vector)

    return result.round()
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
    var result = new Vector3(vector)

    return result.roundToOrigin()
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
    var result = new Vector3(left)

    return result.min(right)
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
    var result = new Vector3(left)

    return result.max(right)
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
    var result = new Vector3(from)

    return result.lerp(to, alpha)
  }

  project(onNormal)
  {
    var factor = onNormal.dot(this) / onNormal.sqrLength()

    return this.copy(onNormal).muliply(factor)
  }

  static Projected(vector, onNormal)
  {
    var result = new Vector3(vector)

    return result.project(onNormal)
  }

  projectOnPlane(planeNormal)
  {
    return this.sub(Vector3.Projected(this, planeNormal))
  }

  static ProjectedOnPlane(vector, on)
  {
    var result = new Vector3(vector)

    return result.projectOnPlane(on)
  }

  reflect(normal)
  {
    return this.sub(Vector3.Multiply(normal, 2 * this.dot(normal)))
  }

  static Reflected(vector, normal)
  {
    var result = new Vector3(vector)

    return result.reflect(normal)
  }

  transform(transformer)
  {
    if(transformer instanceof Matrix4)
    {
      this.x = transformer.elements[0] * this.x + transformer.elements[4] * this.y + transformer.elements[8] * this.z + transformer.elements[12]
      this.y = transformer.elements[1] * this.x + transformer.elements[5] * this.y + transformer.elements[9] * this.z + transformer.elements[13]
      this.z = transformer.elements[2] * this.x + transformer.elements[6] * this.y + transformer.elements[10] * this.z + transformer.elements[14]
    }
    else if(transformer instanceof Quaternion)
    {
      var ix =  transformer.w * this.x + transformer.y * this.z - transformer.z * this.y
      var iy =  transformer.w * this.y + transformer.z * this.x - transformer.x * this.z
      var iz =  transformer.w * this.z + transformer.x * this.y - transformer.y * this.x
      var iw = -transformer.x * this.x - transformer.y * this.y - transformer.z * this.z

      this.x = ix * transformer.w + iw * - transformer.x + iy * - transformer.z - iz * - transformer.y
      this.y = iy * transformer.w + iw * - transformer.y + iz * - transformer.x - ix * - transformer.z
      this.z = iz * transformer.w + iw * - transformer.z + ix * - transformer.y - iy * - transformer.x
    }

    return this
  }

  static Transformed(vector, transformer)
  {
    var result = new Vector3(vector)

    return result.transform(transformer)
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
