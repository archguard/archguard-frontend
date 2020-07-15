const mockData = {
	nodes: [
		{
			id: 1,
			name: 'evolution',
			parent: 0
		},
		{
			id: 2,
			name: 'dependence',
			parent: 1
		},
		{
			id: 3,
			name: 'application',
			parent: 2
		},
		{
			id: 4,
			name: 'fix',
			parent: 3
		},
		{
			id: 5,
			name: 'domain',
			parent: 2
		},
		{
			id: 6,
			name: 'models',
			parent: 5
		},
		{
			id: 7,
			name: 'repository',
			parent: 5
		},
		{
			id: 8,
			name: 'scan',
			parent: 5
		},
		{
			id: 9,
			name: 'asm',
			parent: 8
		},
		{
			id: 10,
			name: 'infrastructure',
			parent: 2
		},
		{
			id: 11,
			name: 'utils',
			parent: 2
		},
		{
			id: 12,
			name: 'io',
			parent: 0
		},
		{
			id: 13,
			name: 'netty',
			parent: 12
		},
		{
			id: 14,
			name: 'util',
			parent: 13
		},
		{
			id: 15,
			name: 'internal',
			parent: 14
		},
		{
			id: 16,
			name: 'java',
			parent: 0
		},
		{
			id: 17,
			name: 'io',
			parent: 16
		},
		{
			id: 18,
			name: 'lang',
			parent: 16
		},
		{
			id: 19,
			name: 'nio',
			parent: 16
		},
		{
			id: 20,
			name: 'file',
			parent: 19
		},
		{
			id: 21,
			name: 'attribute',
			parent: 20
		},
		{
			id: 22,
			name: 'text',
			parent: 16
		},
		{
			id: 23,
			name: 'util',
			parent: 16
		},
		{
			id: 24,
			name: 'concurrent',
			parent: 23
		},
		{
			id: 25,
			name: 'atomic',
			parent: 24
		},
		{
			id: 26,
			name: 'function',
			parent: 23
		},
		{
			id: 27,
			name: 'stream',
			parent: 23
		},
		{
			id: 28,
			name: 'org',
			parent: 0
		},
		{
			id: 29,
			name: 'objectweb',
			parent: 28
		},
		{
			id: 30,
			name: 'asm',
			parent: 29
		},
		{
			id: 31,
			name: 'tree',
			parent: 30
		},
		{
			id: 32,
			name: 'skife',
			parent: 28
		},
		{
			id: 33,
			name: 'jdbi',
			parent: 32
		},
		{
			id: 34,
			name: 'v2',
			parent: 33
		},
		{
			id: 35,
			name: 'slf4j',
			parent: 28
		}
	],
		edges: [
	{
		a: 3,
		b: 9,
		num: 2
	},
	{
		a: 3,
		b: 17,
		num: 2
	},
	{
		a: 3,
		b: 18,
		num: 13
	},
	{
		a: 3,
		b: 25,
		num: 2
	},
	{
		a: 3,
		b: 23,
		num: 5
	},
	{
		a: 3,
		b: 20,
		num: 6
	},
	{
		a: 3,
		b: 35,
		num: 10
	},
	{
		a: 3,
		b: 7,
		num: 3
	},
	{
		a: 3,
		b: 6,
		num: 4
	},
	{
		a: 3,
		b: 15,
		num: 1
	},
	{
		a: 3,
		b: 10,
		num: 3
	},
	{
		a: 3,
		b: 11,
		num: 2
	},
	{
		a: 7,
		b: 5,
		num: 13
	},
	{
		a: 7,
		b: 23,
		num: 33
	},
	{
		a: 7,
		b: 25,
		num: 3
	},
	{
		a: 7,
		b: 6,
		num: 18
	},
	{
		a: 7,
		b: 22,
		num: 1
	},
	{
		a: 6,
		b: 23,
		num: 12
	},
	{
		a: 6,
		b: 27,
		num: 3
	},
	{
		a: 6,
		b: 18,
		num: 18
	},
	{
		a: 4,
		b: 5,
		num: 4
	},
	{
		a: 4,
		b: 27,
		num: 3
	},
	{
		a: 4,
		b: 18,
		num: 17
	},
	{
		a: 4,
		b: 25,
		num: 4
	},
	{
		a: 4,
		b: 17,
		num: 2
	},
	{
		a: 4,
		b: 23,
		num: 20
	},
	{
		a: 4,
		b: 35,
		num: 15
	},
	{
		a: 4,
		b: 34,
		num: 20
	},
	{
		a: 4,
		b: 6,
		num: 2
	},
	{
		a: 4,
		b: 3,
		num: 1
	},
	{
		a: 4,
		b: 10,
		num: 1
	},
	{
		a: 10,
		b: 23,
		num: 118
	},
	{
		a: 10,
		b: 35,
		num: 8
	},
	{
		a: 10,
		b: 18,
		num: 51
	},
	{
		a: 10,
		b: 34,
		num: 13
	},
	{
		a: 10,
		b: 11,
		num: 4
	},
	{
		a: 9,
		b: 18,
		num: 5
	},
	{
		a: 9,
		b: 27,
		num: 3
	},
	{
		a: 9,
		b: 6,
		num: 11
	},
	{
		a: 9,
		b: 30,
		num: 4
	},
	{
		a: 9,
		b: 23,
		num: 7
	},
	{
		a: 9,
		b: 20,
		num: 2
	},
	{
		a: 9,
		b: 35,
		num: 5
	},
	{
		a: 9,
		b: 26,
		num: 2
	},
	{
		a: 9,
		b: 24,
		num: 1
	},
	{
		a: 9,
		b: 17,
		num: 2
	},
	{
		a: 9,
		b: 21,
		num: 1
	},
	{
		a: 9,
		b: 31,
		num: 1
	},
	{
		a: 11,
		b: 20,
		num: 8
	},
	{
		a: 11,
		b: 35,
		num: 3
	},
	{
		a: 11,
		b: 23,
		num: 1
	},
	{
		a: 11,
		b: 17,
		num: 2
	}
]
}



// const mockData = {
// 	nodes: [
// 		{
// 			id: 1,
// 			name: "application",
// 			parent: 0
// 		},
// 		{
// 			id: 2,
// 			name: "fix",
// 			parent: 1
// 		},
// 		{
// 			id: 3,
// 			name: "fix2",
// 			parent: 1
// 		},
// 		{
// 			id: 4,
// 			name: "fix2_son",
// 			parent: 3
// 		},
// 		{
// 			id: 5,
// 			name: "core",
// 			parent: 0
// 		},
// 		{
// 			id: 6,
// 			name: "com",
// 			parent: 5
// 		},
// 		{
// 			id: 7,
// 			name: "headway",
// 			parent: 5
// 		},
// 		{
// 			id: 8,
// 			name: "generic",
// 			parent: 0
// 		},
// 		{
// 			id: 9,
// 			name: "parser-gen",
// 			parent: 8
// 		},
// 		{
// 			id: 10,
// 			name: "headway",
// 			parent: 9
// 		},
// 		{
// 			id: 11,
// 			name: "dotnet",
// 			parent: 0
// 		},
// 		{
// 			id: 12,
// 			name: "parser-java",
// 			parent: 0
// 		},
// 		{
// 			id: 13,
// 			name: "parser-javax",
// 			parent: 0
// 		},
// 		{
// 			id: 14,
// 			name: "foundation",
// 			parent: 0
// 		},
// 		{
// 			id: 15,
// 			name: "application",
// 			parent: 0
// 		},
// 		{
// 			id: 16,
// 			name: "fix",
// 			parent: 15
// 		},
// 		{
// 			id: 17,
// 			name: "core",
// 			parent: 0
// 		},
// 		{
// 			id: 18,
// 			name: "com",
// 			parent: 17
// 		},
// 		{
// 			id: 19,
// 			name: "headway",
// 			parent: 18
// 		},
// 		{
// 			id: 20,
// 			name: "config",
// 			parent: 19
// 		},
// 	],
// 	edges: [
// 		{
// 			a: 1,
// 			b: 2,
// 			num: 10
// 		},
// 		{
// 			a: 1,
// 			b: 3,
// 			num: 4
// 		},
// 		{
// 			a: 1,
// 			b: 6,
// 			num: 4
// 		},
// 		{
// 			a: 1,
// 			b: 4,
// 			num: 2
// 		},
// 		{
// 			a: 2,
// 			b: 7,
// 			num: 2
// 		},
// 		{
// 			a: 7,
// 			b: 10,
// 			num: 2
// 		},
// 		{
// 			a: 20,
// 			b: 4,
// 			num:3
// 		}
// 	]
// }

export default mockData;

