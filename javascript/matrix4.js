/*
Copyright (c) 2016, David De Anda. All rights reserved.
Copyrights licensed under MIT License
*/

class Matrix4
{

  constructor()
  {
    if(arguments.length == 0)
    {
      this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    }
    else if(arguments[0] instanceof Matrix4)
    {
      this.elements = new Float32Array(16)
      this.elements.set(arguments[0].elements)
    }
    else if(arguments[0] instanceof Array)
    {
      this.elements = new Float32Array(16)
      this.elements.set(arguments[0].slice(0, 16))
    }
    else
    {
      this.elements = new Float32Array(16)
      for(var i = 0; i < 16; i++)
      {
        this.elements[i] = arguments[i]
      }
    }
  }

  clone()
  {
    return new Matrix4(this)
  }

  copy(matrix)
  {
    this.elements.set(matrix.elements)

    return this
  }

  toArray()
  {
    return this.elements.slice()
  }

  writeInArray(array, index)
  {
    for(var i = 0; i < 16; i++)
    {
      array[index + i] = this.elements[i]
    }

    return array
  }

  loadFromAray(array, index = 0)
  {
    this.elements.set(array.slice(index, index + 16))

    return this
  }

  static FromArray(array, index)
  {
    return new Matrix4(array.slice(index, index + 16))
  }

  toString(lineBreak = "")
  {
    return "{{" + this.elements[0] + ", " + this.elements[1] + ", " + this.elements[2] + ", " + this.elements[3] + "}, " + lineBreak +
            "{" + this.elements[4] + ", " + this.elements[5] + ", " + this.elements[6] + ", " + this.elements[7] + "}, " + lineBreak +
            "{" + this.elements[8] + ", " + this.elements[9] + ", " + this.elements[10] + ", " + this.elements[11] + "}, " + lineBreak +
            "{" + this.elements[12] + ", " + this.elements[13] + ", " + this.elements[14] + ", " + this.elements[15] + "}}"
  }

  determinant()
  {
    return this.elements[12] * (
                                this.elements[3] * this.elements[6] * this.elements[9]
                              - this.elements[2] * this.elements[7] * this.elements[9]
                              - this.elements[3] * this.elements[5] * this.elements[10]
                              + this.elements[1] * this.elements[7] * this.elements[10]
                              + this.elements[2] * this.elements[5] * this.elements[11]
                              - this.elements[1] * this.elements[6] * this.elements[11])
         + this.elements[13] * (
                                this.elements[0] * this.elements[6] * this.elements[11]
                              - this.elements[0] * this.elements[7] * this.elements[10]
                              + this.elements[3] * this.elements[4] * this.elements[10]
                              - this.elements[2] * this.elements[4] * this.elements[11]
                              + this.elements[2] * this.elements[7] * this.elements[8]
                              - this.elements[3] * this.elements[6] * this.elements[8])
         + this.elements[14] * (
                                this.elements[0] * this.elements[7] * this.elements[9]
                              - this.elements[0] * this.elements[5] * this.elements[11]
                              - this.elements[3] * this.elements[4] * this.elements[9]
                              + this.elements[1] * this.elements[4] * this.elements[11]
                              + this.elements[3] * this.elements[5] * this.elements[8]
                              - this.elements[1] * this.elements[7] * this.elements[8])
         + this.elements[15] * (
                              - this.elements[2] * this.elements[5] * this.elements[8]
                              - this.elements[0] * this.elements[6] * this.elements[9]
                              + this.elements[0] * this.elements[5] * this.elements[10]
                              + this.elements[2] * this.elements[4] * this.elements[9]
                              - this.elements[1] * this.elements[4] * this.elements[10]
                              + this.elements[1] * this.elements[6] * this.elements[8])
  }

  invert()
  {
    var inv = Array(16)

    inv[0]  =  this.elements[5] * this.elements[10] * this.elements[15] -
               this.elements[5] * this.elements[11] * this.elements[14] -
               this.elements[9] * this.elements[6] * this.elements[15] +
               this.elements[9] * this.elements[7] * this.elements[14] +
               this.elements[13] * this.elements[6] * this.elements[11] -
               this.elements[13] * this.elements[7] * this.elements[10]

    inv[4]  = -this.elements[4] * this.elements[10] * this.elements[15] +
               this.elements[4] * this.elements[11] * this.elements[14] +
               this.elements[8] * this.elements[6] * this.elements[15] -
               this.elements[8] * this.elements[7] * this.elements[14] -
               this.elements[12] * this.elements[6] * this.elements[11] +
               this.elements[12] * this.elements[7] * this.elements[10]

    inv[8]  =  this.elements[4] * this.elements[9] * this.elements[15] -
               this.elements[4] * this.elements[11] * this.elements[13] -
               this.elements[8] * this.elements[5] * this.elements[15] +
               this.elements[8] * this.elements[7] * this.elements[13] +
               this.elements[12] * this.elements[5] * this.elements[11] -
               this.elements[12] * this.elements[7] * this.elements[9]

    inv[12] = -this.elements[4] * this.elements[9] * this.elements[14] +
               this.elements[4] * this.elements[10] * this.elements[13] +
               this.elements[8] * this.elements[5] * this.elements[14] -
               this.elements[8] * this.elements[6] * this.elements[13] -
               this.elements[12] * this.elements[5] * this.elements[10] +
               this.elements[12] * this.elements[6] * this.elements[9]

    var det = this.elements[0] * inv[0] + this.elements[1] * inv[4] + this.elements[2] * inv[8] + this.elements[3] * inv[12]

    if (det == 0) return undefined

    inv[1]  = -this.elements[1] * this.elements[10] * this.elements[15] +
               this.elements[1] * this.elements[11] * this.elements[14] +
               this.elements[9] * this.elements[2] * this.elements[15] -
               this.elements[9] * this.elements[3] * this.elements[14] -
               this.elements[13] * this.elements[2] * this.elements[11] +
               this.elements[13] * this.elements[3] * this.elements[10]

    inv[5]  =  this.elements[0] * this.elements[10] * this.elements[15] -
               this.elements[0] * this.elements[11] * this.elements[14] -
               this.elements[8] * this.elements[2] * this.elements[15] +
               this.elements[8] * this.elements[3] * this.elements[14] +
               this.elements[12] * this.elements[2] * this.elements[11] -
               this.elements[12] * this.elements[3] * this.elements[10]

    inv[9]  = -this.elements[0] * this.elements[9] * this.elements[15] +
               this.elements[0] * this.elements[11] * this.elements[13] +
               this.elements[8] * this.elements[1] * this.elements[15] -
               this.elements[8] * this.elements[3] * this.elements[13] -
               this.elements[12] * this.elements[1] * this.elements[11] +
               this.elements[12] * this.elements[3] * this.elements[9]

    inv[13] =  this.elements[0] * this.elements[9] * this.elements[14] -
               this.elements[0] * this.elements[10] * this.elements[13] -
               this.elements[8] * this.elements[1] * this.elements[14] +
               this.elements[8] * this.elements[2] * this.elements[13] +
               this.elements[12] * this.elements[1] * this.elements[10] -
               this.elements[12] * this.elements[2] * this.elements[9]

    inv[2]  =  this.elements[1] * this.elements[6] * this.elements[15] -
               this.elements[1] * this.elements[7] * this.elements[14] -
               this.elements[5] * this.elements[2] * this.elements[15] +
               this.elements[5] * this.elements[3] * this.elements[14] +
               this.elements[13] * this.elements[2] * this.elements[7] -
               this.elements[13] * this.elements[3] * this.elements[6]

    inv[6]  = -this.elements[0] * this.elements[6] * this.elements[15] +
               this.elements[0] * this.elements[7] * this.elements[14] +
               this.elements[4] * this.elements[2] * this.elements[15] -
               this.elements[4] * this.elements[3] * this.elements[14] -
               this.elements[12] * this.elements[2] * this.elements[7] +
               this.elements[12] * this.elements[3] * this.elements[6]

    inv[10] =  this.elements[0] * this.elements[5] * this.elements[15] -
               this.elements[0] * this.elements[7] * this.elements[13] -
               this.elements[4] * this.elements[1] * this.elements[15] +
               this.elements[4] * this.elements[3] * this.elements[13] +
               this.elements[12] * this.elements[1] * this.elements[7] -
               this.elements[12] * this.elements[3] * this.elements[5]

    inv[14] = -this.elements[0] * this.elements[5] * this.elements[14] +
               this.elements[0] * this.elements[6] * this.elements[13] +
               this.elements[4] * this.elements[1] * this.elements[14] -
               this.elements[4] * this.elements[2] * this.elements[13] -
               this.elements[12] * this.elements[1] * this.elements[6] +
               this.elements[12] * this.elements[2] * this.elements[5]

    inv[3]  = -this.elements[1] * this.elements[6] * this.elements[11] +
               this.elements[1] * this.elements[7] * this.elements[10] +
               this.elements[5] * this.elements[2] * this.elements[11] -
               this.elements[5] * this.elements[3] * this.elements[10] -
               this.elements[9] * this.elements[2] * this.elements[7] +
               this.elements[9] * this.elements[3] * this.elements[6]

    inv[7]  =  this.elements[0] * this.elements[6] * this.elements[11] -
               this.elements[0] * this.elements[7] * this.elements[10] -
               this.elements[4] * this.elements[2] * this.elements[11] +
               this.elements[4] * this.elements[3] * this.elements[10] +
               this.elements[8] * this.elements[2] * this.elements[7] -
               this.elements[8] * this.elements[3] * this.elements[6]

    inv[11] = -this.elements[0] * this.elements[5] * this.elements[11] +
               this.elements[0] * this.elements[7] * this.elements[9] +
               this.elements[4] * this.elements[1] * this.elements[11] -
               this.elements[4] * this.elements[3] * this.elements[9] -
               this.elements[8] * this.elements[1] * this.elements[7] +
               this.elements[8] * this.elements[3] * this.elements[5]

    inv[15] =  this.elements[0] * this.elements[5] * this.elements[10] -
               this.elements[0] * this.elements[6] * this.elements[9] -
               this.elements[4] * this.elements[1] * this.elements[10] +
               this.elements[4] * this.elements[2] * this.elements[9] +
               this.elements[8] * this.elements[1] * this.elements[6] -
               this.elements[8] * this.elements[2] * this.elements[5]

    det = 1.0 / det

    for (var i = 0; i < 16; i++)
      inv[i] = inv[i] * det

    this.elements = inv

    return this
  }

  static Inverse(matrix)
  {
    var result = new Matrix4(matrix)

    return result.invert()
  }

  transpose()
  {
    for(var i = 0; i < 4; i++)
    {
      for(var j = i + 1; j < 4; j++)
      {
        var t = this.elements[i * 4 + j]
        this.elements[i * 4 + j] = this.elements[j * 4 + i]
        this.elements[j * 4 + i] = t
      }
    }

    return this
  }

  static Transposed(matrix)
  {
    var result = new Matrix4(matrix)

    return result.transpose()
  }

  add(factor)
  {
    for(var i = 0; i < 16; i++)
    {
      if(factor instanceof Matrix4)
        this.elements[i] += factor.elements[i]
      else
        this.elements[i] += factor
    }

    return this
  }

  static Add(matrix, factor)
  {
    var result = new Matrix4(matrix)

    return result.add(factor)
  }


  sub(factor)
  {
    for(var i = 0; i < 16; i++)
    {
      if(factor instanceof Matrix4)
        this.elements[i] -= factor.elements[i]
      else
        this.elements[i] -= factor
    }

    return this
  }

  static Sub(matrix, factor)
  {
    var result = new Matrix4(matrix)

    return result.sub(factor)
  }

  multiply(factor)
  {
    if(factor instanceof Matrix4)
    {
      var me = this.elements.slice()

      this.elements[0] = me[0] * factor.elements[0] + me[1] * factor.elements[4] + me[2] * factor.elements[8] + me[3] * factor.elements[12]
      this.elements[1] = me[0] * factor.elements[1] + me[1] * factor.elements[5] + me[2] * factor.elements[9] + me[3] * factor.elements[13]
      this.elements[2] = me[0] * factor.elements[2] + me[1] * factor.elements[6] + me[2] * factor.elements[10] + me[3] * factor.elements[14]
      this.elements[3] = me[0] * factor.elements[3] + me[1] * factor.elements[7] + me[2] * factor.elements[11] + me[3] * factor.elements[15]

      this.elements[4] = me[4] * factor.elements[0] + me[5] * factor.elements[4] + me[6] * factor.elements[8] + me[7] * factor.elements[12]
      this.elements[5] = me[4] * factor.elements[1] + me[5] * factor.elements[5] + me[6] * factor.elements[9] + me[7] * factor.elements[13]
      this.elements[6] = me[4] * factor.elements[2] + me[5] * factor.elements[6] + me[6] * factor.elements[10] + me[7] * factor.elements[14]
      this.elements[7] = me[4] * factor.elements[3] + me[5] * factor.elements[7] + me[6] * factor.elements[11] + me[7] * factor.elements[15]

      this.elements[8] = me[8] * factor.elements[0] + me[9] * factor.elements[4] + me[10] * factor.elements[8] + me[11] * factor.elements[12]
      this.elements[9] = me[8] * factor.elements[1] + me[9] * factor.elements[5] + me[10] * factor.elements[9] + me[11] * factor.elements[13]
      this.elements[10] = me[8] * factor.elements[2] + me[9] * factor.elements[6] + me[10] * factor.elements[10] + me[11] * factor.elements[14]
      this.elements[11] = me[8] * factor.elements[3] + me[9] * factor.elements[7] + me[10] * factor.elements[11] + me[11] * factor.elements[15]

      this.elements[12] = me[12] * factor.elements[0] + me[13] * factor.elements[4] + me[14] * factor.elements[8] + me[15] * factor.elements[12]
      this.elements[13] = me[12] * factor.elements[1] + me[13] * factor.elements[5] + me[14] * factor.elements[9] + me[15] * factor.elements[13]
      this.elements[14] = me[12] * factor.elements[2] + me[13] * factor.elements[6] + me[14] * factor.elements[10] + me[15] * factor.elements[14]
      this.elements[15] = me[12] * factor.elements[3] + me[13] * factor.elements[7] + me[14] * factor.elements[11] + me[15] * factor.elements[15]
    }
    else
    {
      for(var i = 0; i < 16; i++)
        this.elements[i] *= factor
    }

    return this
  }

  static Multiply(matrix, factor)
  {
    var result = new Matrix4(matrix)

    return result.multiply(factor)
  }

  divide(scalar)
  {
    for(var i = 0; i < 16; i++)
        this.elements[i] /= scalar

    return this
  }

  static Divide(matrix, scalar)
  {
    var result = new Matrix4(matrix)

    return result.divide(scalar)
  }

  makeTranslation(translation)
  {
    return this.loadFromAray([1, 0, 0, 0,
                              0, 1, 0, 0,
                              0, 0, 1, 0,
                              translation.x, translation.y, translation.z, 1])
  }

  static TranslationMatrix(translation)
  {
    var result = new Matrix4()

    return result.makeTranslation(translation)
  }

  makeRotationX(theta)
  {
    var c = Math.cos(theta)
    var s = Math.sin(theta)

    return this.loadFromAray([1,  0, 0, 0,
                              0,  c, s, 0,
                              0, -s, c, 0,
                              0,  0, 0, 1])
  }

  static RotationXMatrix(theta)
  {
    var result = new Matrix4()

    return result.makeRotationX(theta)
  }

  makeRotationY(theta)
  {
    var c = Math.cos(theta)
    var s = Math.sin(theta)

    return this.loadFromAray([c, 0, -s, 0,
                              0, 1,  0, 0,
                              s, 0,  c, 0,
                              0, 0,  0, 1])
  }

  static RotationYMatrix(theta)
  {
    var result = new Matrix4()

    return result.makeRotationY(theta)
  }

  makeRotationZ(theta)
  {
    var c = Math.cos(theta)
    var s = Math.sin(theta)

    return this.loadFromAray([c, -s, 0, 0,
                              s,  c, 0, 0,
                              0,  0, 1, 0,
                              0,  0, 0, 1])
  }

  static RotationZMatrix(theta)
  {
    var result = new Matrix4()

    return result.makeRotationZ(theta)
  }

  makeRotationAxis(axis, theta)
  {
    var c = Math.cos(theta)
    var s = Math.sin(theta)

    var t = 1 - c
    var tx = t * axis.x
    var ty = t * axis.y

    return this.loadFromAray([tx * axis.x + c,          tx * axis.y + s * axis.z, tx * axis.z - s * axis.y, 0,
                              tx * axis.y - s * axis.z, ty * axis.y + c,          ty * axis.z + s * axis.x, 0,
                              tx * axis.z + s * axis.y, ty * axis.z - s * axis.x, t * axis.z * axis.z + c,  0,
                              0, 0, 0, 1])
  }

  static RotationAxisMatrix(axis, theta)
  {
    var result = new Matrix4()

    return result.makeRotationAxis(axis, theta)
  }

  makeRotationFromEuler(euler, order = "XYZ")
  {
    var cx = Math.cos(euler.x)
    var sx = Math.sin(euler.x)
    var cy = Math.cos(euler.y)
    var sy = Math.sin(euler.y)
    var cz = Math.cos(euler.z)
    var sz = Math.sin(euler.z)

    if(order === "XYZ" )
    {
      var cxcz = cx * cz
      var cxsz = cx * sz
      var sxcz = sx * cz
      var sxsz = sx * sz

      this.elements[0] = cy * cz
      this.elements[4] = - cy * sz
      this.elements[8] = sy

      this.elements[1] = cxsz + sxcz * sy
      this.elements[5] = cxcz - sxsz * sy
      this.elements[9] = - sx * cy

      this.elements[2] = sxsz - cxcz * sy
      this.elements[6] = sxcz + cxsz * sy
      this.elements[10] = cx * cy
    }
    else if(order === "XZY")
    {
      var cxcy = cx * cy
      var cxsy = cx * sy
      var sxcy = sx * cy
      var sxsy = sx * sy

      this.elements[0] = cy * cz
      this.elements[4] = - sz
      this.elements[8] = sy * cz

      this.elements[1] = cxcy * sz + sxsy
      this.elements[5] = cx * cz
      this.elements[9] = cxsy * sz - sxcy

      this.elements[2] = sxcy * sz - cxsy
      this.elements[6] = sx * cz
      this.elements[10] = sxsy * sz + cxcy
    }
    else if(order === "YXZ")
    {
      var cycz = cy * cz
      var cysz = cy * sz
      var sycz = sy * cz
      var sysz = sy * sz

      this.elements[0] = cycz + sysz * sx
      this.elements[4] = sycz * sx - cysz
      this.elements[8] = cx * sy

      this.elements[1] = cx * sz
      this.elements[5] = cx * cz
      this.elements[9] = - sx

      this.elements[2] = cysz * sx - sycz
      this.elements[6] = sysz + cycz * sx
      this.elements[10] = cx * cy
    }
    else if(euler.order === "YZX")
    {
      var cxcy = cx * cy
      var cxsy = cx * sy
      var sxcy = sx * cy
      var sxsy = sx * sy

      this.elements[0] = cy * cz
      this.elements[4] = sxsy - cxcy * sz
      this.elements[8] = sxcy * sz + cxsy

      this.elements[1] = sz
      this.elements[5] = cx * cz
      this.elements[9] = - sx * cz

      this.elements[2] = - sy * cz
      this.elements[6] = cxsy * sz + sxcy
      this.elements[10] = cxcy - sxsy * sz
    }
    else if(euler.order === "ZXY")
    {
      var cycz = cy * cz
      var cysz = cy * sz
      var sycz = sy * cz
      var sysz = sy * sz

      this.elements[0] = cycz - sysz * sx
      this.elements[4] = - cx * sz
      this.elements[8] = sycz + cysz * sx

      this.elements[1] = cysz + sycz * sx
      this.elements[5] = cx * cz
      this.elements[9] = sysz - cycz * sx

      this.elements[2] = - cx * sy
      this.elements[6] = sx
      this.elements[10] = cx * cy
    }
    else if(euler.order === "ZYX")
    {
      var cxcz = cx * cz
      var cxsz = cx * sz
      var sxcz = sx * cz
      var sxsz = sx * sz

      this.elements[0] = cy * cz
      this.elements[4] = sxcz * sy - cxsz
      this.elements[8] = cxcz * sy + sxsz

      this.elements[1] = cy * sz
      this.elements[5] = sxsz * sy + cxcz
      this.elements[9] = cxsz * sy - sxcz

      this.elements[2] = - sy
      this.elements[6] = sx * cy
      this.elements[10] = cx * cy
    }

    this.elements[3] = 0
    this.elements[7] = 0
    this.elements[11] = 0

    this.elements[12] = 0
    this.elements[13] = 0
    this.elements[14] = 0
    this.elements[15] = 1

    return this
  }

  static RotationMatrixFromEuler(euler)
  {
    var result = new Matrix4()

    return result.makeRotationFromEuler(euler)
  }

  makeRotationFromQuaternion(quaternion)
  {
    var x2 = quaternion.x * 2
    var y2 = quaternion.y * 2
    var z2 = quaternion.z * 2
    var xx2 = quaternion.x * x2
    var xy2 = quaternion.y * x2
    var xz2 = quaternion.z * x2
    var xw2 = quaternion.w * x2
    var yy2 = quaternion.y * y2
    var yz2 = quaternion.z * y2
    var yw2 = quaternion.w * y2
    var zz2 = quaternion.z * z2
    var zw2 = quaternion.w * z2

    this.elements[0] = 1 - yy2 + zz2
    this.elements[4] = xy2 - zw2
    this.elements[8] = xz2 + yw2

    this.elements[1] = xy2 + zw2
    this.elements[5] = 1 - xx2 + zz2
    this.elements[9] = yz2 - xw2

    this.elements[2] = xz2 - yw2
    this.elements[6] = yz2 + xw2
    this.elements[10] = 1 - xx2 + yy2

    this.elements[3] = 0
    this.elements[7] = 0
    this.elements[11] = 0

    this.elements[12] = 0
    this.elements[13] = 0
    this.elements[14] = 0
    this.elements[15] = 1

    return this
  }

  static RotationMatrixFromQuaternion(quaternion)
  {
    var result = new Matrix4()

    return result.makeRotationFromQuaternion(quaternion)
  }

  makeScale(scale)
  {
    if(scale instanceof Vector3)
    {
      return this.loadFromAray([scale.x, 0,       0,       0,
                                0,       scale.y, 0,       0,
                                0,       0,       scale.y, 0,
                                0,       0,       0,       1])
    }
    else
    {
      return this.loadFromAray([scale, 0,     0,     0,
                                0,     scale, 0,     0,
                                0,     0,     scale, 0,
                                0,     0,     0,     1])
    }
  }

  static ScaleMatrix(scale)
  {
    var result = new Matrix4()

    return result.makeScale(scale)
  }

  lookAt(eye, target, up)
  {
    var z = Vector3.Sub(eye, target).normalize()

    if(z.sqrLength() === 0 )
      z.z = 1;

    var x = Vector3.Cross(up, z).normalize()

    if (x.sqrLength === 0 )
    {
      z.z += 0.0001;
      x = Vector3.Cross(up, z).normalize()
    }

    var y = Vector3.Cross(z, x)

    this.elements[0] = x.x
    this.elements[1] = x.y
    this.elements[2] = x.z
    this.elements[3] = 0
    this.elements[4] = y.x
    this.elements[5] = y.y
    this.elements[6] = y.z
    this.elements[7] = 0
    this.elements[8] = z.x
    this.elements[9] = z.y
    this.elements[10] = z.z
    this.elements[11] = 0
    this.elements[12] = 0
    this.elements[13] = 0
    this.elements[14] = 1

    return this;
  }

  static LookAtMatrix(eye, target, up)
  {
    var result = new Matrix4()

    return result.lookAt(eye, target, up)
  }

  makeFrustum(left, right, bottom, top, near, far)
  {
    var x = 2 * near / (right - left)
    var y = 2 * near / (top - bottom)

    this.elements[0] = x
    this.elements[1] = 0
    this.elements[2] = 0
    this.elements[3] = 0
    this.elements[4] = 0
    this.elements[5] = y
    this.elements[6] = 0
    this.elements[7] = 0
    this.elements[8] = (right + left) / (right - left)
    this.elements[9] = (top + bottom) / (top - bottom)
    this.elements[10] = -(far + near) / (far - near)
    this.elements[11] = -1
    this.elements[12] = 0
    this.elements[13] = 0
    this.elements[14] = -2 * far * near / (far - near)
    this.elements[15] = 0

    return this
  }

  static FrustumMatrix(left, right, bottom, top, near, far)
  {
    var result = new Matrix4()

    return result.makeFrustum(left, right, bottom, top, near, far)
  }

  makePerspective(fov, aspect, near, far)
  {
    var ymax = near * Math.tan( Math.toRadians(fov) * 0.5)
    var ymin = -ymax
    var xmin = ymin * aspect
    var xmax = ymax * aspect

    return this.makeFrustum(xmin, xmax, ymin, ymax, near, far)
  }

  static PerspectiveMatrix(fov, aspect, near, far)
  {
    var result = new Matrix4()

    return result.makePerspective(fov, aspect, near, far)
  }

  makeOrthographic(left, right, top, bottom, near, far)
  {
    var w = 1.0 / (right - left)
    var h = 1.0 / (top - bottom)
    var p = 1.0 / (far - near)

    var x = (right + left) * w
    var y = (top + bottom) * h
    var z = (far + near) * p

    this.elements[0] = 2 * w
    this.elements[1] = 0
    this.elements[2] = 0
    this.elements[3] = 0
    this.elements[4] = 0
    this.elements[5] = 2 * h
    this.elements[6] = 0
    this.elements[7] = 0
    this.elements[8] = 0
    this.elements[9] = 0
    this.elements[10] = - 2 * p
    this.elements[11] = 0
    this.elements[12] = -x
    this.elements[13] = - y
    this.elements[14] = - z
    this.elements[15] = 1

    return this
  }

  static OrthographicMatrix(left, right, top, bottom, near, far)
  {
    var result = new Matrix4()

    return result.makeOrthographic(left, right, top, bottom, near, far)
  }

  static identity()
  {
    return new Matrix4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  }

  static zero()
  {
    return new Matrix4([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0])
  }

}
