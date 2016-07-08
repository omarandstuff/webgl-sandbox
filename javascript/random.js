/*
Copyright (c) 2016, David De Anda.  All rights reserved.
Copyrights licensed under MIT License
*/

class Random
{
  static Next(min, max)
  {
    if(max == undefined)
      return Math.random()
    else
      return Math.random() * (max - min) + min
  }
}
