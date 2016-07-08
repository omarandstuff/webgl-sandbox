/*
Copyright (c) 2016, David De Anda.  All rights reserved.
Copyrights licensed under MIT License
*/

Math.clamp = function(number, min, max)
{
  return Math.max(min, Math.min(max, number));
}

Math.toDegrees = function(angle)
{
  return angle * 57.29577951308232087679;
}

Math.toRadians = function(angle)
{
  return angle * 0.01745329251994329576;
}

Math.epsilon = 0.000001;
