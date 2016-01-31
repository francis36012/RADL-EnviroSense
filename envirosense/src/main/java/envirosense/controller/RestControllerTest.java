package envirosense.controller;


import java.util.Random;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerTest
{

	@RequestMapping(value = "/api/square")
	public Square getSquare()
	{
		Random random = new Random();

		return new Square(random.nextInt(200), 10, 15);
	}

	public static class Square
	{
		private final int id;
		private final double length;
		private final double width;

		public Square(int id, double length, double width)
		{
			this.id = id;
			this.length = length;
			this.width = width;
		}

		public int getId()
		{
			return this.id;
		}

		public double getLength()
		{
			return this.length;
		}

		public double getWidth()
		{
			return this.width;
		}
	}
}
