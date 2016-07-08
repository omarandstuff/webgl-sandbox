
Math.Clamp = function(number, min, max)
{
  return Math.max(min, Math.min(max, number));
}

Math.ToDegrees = function(angle)
{
  return angle * 57.29577951308232087679;
}

Math.ToRadians = function(angle)
{
  return angle * 0.01745329251994329576;
}
