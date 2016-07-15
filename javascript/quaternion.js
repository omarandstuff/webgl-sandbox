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
    index = index || 0
    array[index] = this.x
    array[index + 1] = thix.y
    array[index + 2] = this.z
    array[index + 3] = this.w

    return array
  }

  loadFromAray(array, index)
  {
    index = index || 0
    this.x = array[index] || 0
    this.y = array[index + 1] || 0
    this.z = array[index + 2] || 0
    this.w = array[index + 3] || 0

    return this
  }

  static FromArray(array, index)
  {
    index = index || 0
    return new Quaternion(array[index], array[index + 1], array[index + 2], array[index + 3])
  }

  toString()
  { 
    return "[" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + "]"
  }

  length()
  {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
  }

  sqrLength()
  {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
  }

  normalize()
  {
    var length = this.length()

    if (length === 0)
    {
      this.x = 0
      this.y = 0
      this.z = 0
      this.w = 1
    }
    else
    {
      this.x /= length
      this.y /= length
      this.z /= length
      this.w /= length
    }

    return this
  }

  static Normalized(quaternion)
  {
    var result = new Quaternion(quaternion)

    return result.normalize()
  }

  conjugate()
  {
    this.x = -this.x
    this.y = -this.y
    this.z = -this.z

    return this
  }

  static Conjugated(quaternion)
  {
    var result = new Quaternion(quaternion)

    return result.conjugate()
  }

  invert()
  {
    return this.conjugate().normalize();
  }

  static Inverse(quaternion)
  {
    var result = new Quaternion(quaternion)

    return result.invert()
  }

  add(factor) 
  {
    if(factor instanceof Quaternion)
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

  static Add(quaternion, factor)
  {
    var result = new Quaternion(quaternion)

    return result.add(factor)
  }

  sub(factor) 
  {
    if(factor instanceof Quaternion)
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

  static Sub(quaternion, factor)
  {
    var result = new Quaternion(quaternion)

    return result.sub(factor)
  }

  muliply(factor)
  {
    if(factor instanceof Quaternion)
    {
      var x = this.x
      var y = this.y
      var z = this.z
      var w = this.w

      this.x = w * quaternion.x + x * quaternion.w + y * quaternion.z - z * quaternion.y
      this.y = w * quaternion.y + y * quaternion.w + z * quaternion.x - x * quaternion.z
      this.z = w * quaternion.z + z * quaternion.w + x * quaternion.y - y * quaternion.x
      this.w = w * quaternion.w - x * quaternion.x - y * quaternion.y - z * quaternion.z
    }
    else
    {
      this.x *= factor
      this.y *= factor
      this.z *= factor
      this.w *= factor
    }

    return this
  }

  static Multiply(left, right)
  {
    var result = new Quaternion(left)

    return result.muliply(right)
  }

  divide(quaternion)
  {
    return this.muliply(Quaternion.Inverse(quaternion))
  }

  static Divide(left, right)
  {
    var result = new Quaternion(left)

    return result.divide(right)
  }

  dot(quaternion)
  {
    return this.x * quaternion.x + this.y * quaternion.y + this.z * quaternion.z + this.w * quaternion.w
  }

  static Dot(left, right)
  {
    return left.dot(right)
  }

  fromEuler(euler, order)
  {
    var cx = Math.cos(euler.x / 2)
    var sx = Math.sin(euler.x / 2)

    var cy = Math.cos(euler.y / 2)
    var sy = Math.sin(euler.y / 2)

    var cz = Math.cos(euler.z / 2)
    var sz = Math.sin(euler.z / 2)

    if(order === "XYZ")
    {
      this.x = sx * cy * cz + cx * sy * sz
      this.y = cx * sy * cz - sx * cy * sz
      this.z = cx * cy * sz + sx * sy * cz
      this.w = cx * cy * cz - sx * sy * sz
    }
    else if(order === "XZY")
    {
      this.x = sx * cy * cz - cx * sy * sz
      this.y = cx * sy * cz - sx * cy * sz
      this.z = cx * cy * sz + sx * sy * cz
      this.w = cx * cy * cz + sx * sy * sz
    }
    else if(order === "YXZ")
    {
      this.x = sx * cy * cz + cx * sy * sz
      this.y = cx * sy * cz - sx * cy * sz
      this.z = cx * cy * sz - sx * sy * cz
      this.w = cx * cy * cz + sx * sy * sz
    }
    else if(order === "YZX")
    {
      this.x = sx * cy * cz + cx * sy * sz
      this.y = cx * sy * cz + sx * cy * sz
      this.z = cx * cy * sz - sx * sy * cz
      this.w = cx * cy * cz - sx * sy * sz
    }
    else if(order === "ZXY")
    {
      this.x = sx * cy * cz - cx * sy * sz
      this.y = cx * sy * cz + sx * cy * sz
      this.z = cx * cy * sz + sx * sy * cz
      this.w = cx * cy * cz - sx * sy * sz
    }
    else if(order === "ZYX")
    {
      this.x = sx * cy * cz - cx * sy * sz
      this.y = cx * sy * cz + sx * cy * sz
      this.z = cx * cy * sz - sx * sy * cz
      this.w = cx * cy * cz + sx * sy * sz
    }

    return this
  }

  static FromEuler(euler, order)
  {
    var result = new Quaternion()

    return result.fromEuler(euler, order)
  }

  fromAxisAngle(axis, angle)
  {
    var halfAngle = angle / 2
    var sa = Math.sin(halfAngle)

    this.x = axis.x * sa
    this.y = axis.y * sa
    this.z = axis.z * sa
    this.w = Math.cos(halfAngle)

    return this
  }

  static FromAxisAngle(axis, angle)
  {
    var result = new Quaternion()

    return result.fromAxisAngle(axis, angle)
  }

  fromRotationMatrix(matrix)
  {
    var m11 = matrix.elements[0]
    var m12 = matrix.elements[4]
    var m13 = matrix.elements[8]
    var m21 = matrix.elements[1]
    var m22 = matrix.elements[5]
    var m23 = matrix.elements[9]
    var m31 = matrix.elements[2]
    var m32 = matrix.elements[6]
    var m33 = matrix.elements[10]

    var trace = m11 + m22 + m33

    if(trace > 0)
    {
      var s = 0.5 / Math.sqrt(trace + 1.0)

      this.w = 0.25 / s
      this.x = (m32 - m23) * s
      this.y = (m13 - m31) * s
      this.z = (m21 - m12) * s

    }
    else if(m11 > m22 && m11 > m33)
    {
      var s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33)

      this.w = (m32 - m23) / s
      this.x = 0.25 * s
      this.y = (m12 + m21) / s
      this.z = (m13 + m31) / s
    }
    else if (m22 > m33)
    {
      var s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33)

      this.w = (m13 - m31) / s
      this.x = (m12 + m21) / s
      this.y = 0.25 * s
      this.z = (m23 + m32) / s
    }
    else
    {
      var s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22)

      this.w = (m21 - m12) / s
      this.x = (m13 + m31) / s
      this.y = (m23 + m32) / s
      this.z = 0.25 * s
    }

    return this
  }

  static FromRotationMatrix(matrix)
  {
    var result = new Quaternion()

    return result.fromRotationMatrix(matrix)
  }

  fromUnitVectors(from, to)
  {
    var r = from.dot(to) + 1

    if(r < Math.epsilon)
    {
      if(Math.abs(from.x) > Math.abs(from.z))
      {
        this.x = -from.y
        this.y = from.x
        this.z = 0
        this.w = 0
      }
      else
      {
        this.x = 0
        this.y = -from.z
        this.z = from.y
        this.w = 0
      }
    }
    else
    {
      var cross = Vector3.Cross(from, to)

      this.x = cross.x
      this.y = cross.y
      this.z = cross.z
      this.w = r
    }

    return this.normalize()
  }

  static FromUnitVectors(from, to)
  {
    var result = new Quaternion()

    return result.fromUnitVectors(from, to)
  }

  slerp(quaternion, alpha)
  {
    if (alpha === 0) return this
    if (alpha === 1) return this.copy(quaternion)

    var cosHalfTheta = this.dot(quaternion)
    var x = this.x
    var y = this.y
    var z = this.z
    var w = this.w

    if (cosHalfTheta >= 1.0)
    {
      return this
    }

    if (cosHalfTheta < 0)
    {
      this.x = -quaternion.x
      this.y = -quaternion.y
      this.z = -quaternion.z
      this.w = -quaternion.w

      cosHalfTheta = -cosHalfTheta
    }
    else
    {
      this.copy(quaternion)
    }

    var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta)

    if (Math.abs(sinHalfTheta) < 0.001)
    {
      this.x = 0.5 * (x + this.x)
      this.y = 0.5 * (y + this.y)
      this.z = 0.5 * (z + this.z)
      this.w = 0.5 * (w + this.w)

      return this
    }

    var halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta)
    var ratioA = Math.sin((1 - alpha) * halfTheta) / sinHalfTheta
    var ratioB = Math.sin(alpha * halfTheta) / sinHalfTheta

    this.w = (w * ratioA + this.w * ratioB)
    this.x = (x * ratioA + this.x * ratioB)
    this.y = (y * ratioA + this.y * ratioB)
    this.z = (z * ratioA + this.z * ratioB)

    return this;
  }
  
  static Slerp(from, to, alpha)
  {
    var result = new Quaternion(from)

    return result.slerp(to, alpha)
  }

}
