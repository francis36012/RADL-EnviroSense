#include <sys/ioctl.h>
#include <time.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <fcntl.h>
#include <linux/i2c-dev.h.kernel>
#include <linux/i2c.h>

#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>

void error(const char *msg)
{
	perror(msg);
	exit(0);
}

static int fd;

unsigned short i2c_read(unsigned char addr, unsigned char reg, int delay) {
	static struct i2c_msg msgs[1];
	int r;

	struct i2c_rdwr_ioctl_data msgset = {
		msgs,
		sizeof(msgs) / sizeof(*msgs)
	};
	unsigned char buf[4];

	buf[0] = reg;
	msgs[0].addr = addr;
	msgs[0].flags = 0;
	msgs[0].buf = (void *)buf;
 	msgs[0].len = 1;

	r = ioctl(fd, I2C_RDWR, &msgset);
	if (r < 0) {
		return 0xffff;
	}

	if (delay) {
		usleep(delay);
	}

	msgs[0].addr = addr;
	msgs[0].flags = I2C_M_RD;
	msgs[0].buf = (void *)buf;
	msgs[0].len = 2;

	r = ioctl(fd, I2C_RDWR, &msgset);
	if (r < 0) {
		return 0xffff;
	}

	return buf[0]*256 + buf[1];
}


int main(int argc, char *argv[]) {
	fd = open("/dev/i2c-1", O_RDWR);


	int sockfd, portno, n, n2;
	struct sockaddr_in serv_addr;
	struct hostent *server;

	char buffer[256];
	char buffer2[256];
    
	portno= 8124;
    
	sockfd = socket(AF_INET, SOCK_STREAM, 0);
	if (sockfd < 0)
		error("ERROR opening socket");
	server = gethostbyname("localhost");
	if (server == NULL){
		fprintf(stderr, "ERROR, no such host\n");
		exit(0);
	}
	bzero((char *) &serv_addr, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	bcopy((char *)server->h_addr,
		(char *)&serv_addr.sin_addr.s_addr,
		server->h_length);
	serv_addr.sin_port = htons(portno);
	if (connect(sockfd,(struct sockaddr *) &serv_addr,sizeof(serv_addr)) < 0)
		error("ERROR connecting");

	while(1){
		unsigned short temp = i2c_read(0x40, 0, 20000);
		unsigned short hum  = i2c_read(0x40, 1, 20000);

		time_t current_time;
		char* c_time_string;

		current_time  = time(NULL);
		c_time_string = ctime(&current_time);

		if (temp != 0xffff && hum != 0xffff) {
			
			sprintf(buffer, "I2C-1 Temp/Hum %.2f %.2f Time %s", temp * (165.0/65536.0) - 40, hum * (100.0/65536.0), c_time_string);
            
			n = write(sockfd,buffer,strlen(buffer));
            
			if (n < 0)
				error("ERROR writing to socket");
		}

		sleep(4);
		fflush(stdout);
	}
	close(sockfd);
	return 0;
}
